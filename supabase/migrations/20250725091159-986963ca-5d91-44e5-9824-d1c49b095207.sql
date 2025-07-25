-- Create comprehensive database schema for Wang Sam Mo tourism platform

-- Create enum types for better data consistency
CREATE TYPE attraction_category AS ENUM ('temple', 'park', 'museum', 'historical', 'cultural', 'nature', 'shopping', 'entertainment');
CREATE TYPE cuisine_type AS ENUM ('thai', 'northern_thai', 'international', 'street_food', 'cafe', 'bar', 'fast_food');
CREATE TYPE service_type AS ENUM ('accommodation', 'transport', 'tour_guide', 'rental', 'spa', 'shopping', 'other');
CREATE TYPE job_type AS ENUM ('full_time', 'part_time', 'freelance', 'contract', 'internship');
CREATE TYPE job_status AS ENUM ('active', 'filled', 'expired', 'draft');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE entity_type AS ENUM ('attraction', 'restaurant', 'service');

-- Attractions table
CREATE TABLE public.attractions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    name_thai TEXT NOT NULL,
    description TEXT NOT NULL,
    description_thai TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    location JSONB NOT NULL, -- {lat, lng, address, address_thai}
    category attraction_category NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    opening_hours JSONB, -- {monday: "9:00-17:00", tuesday: "9:00-17:00", ...}
    price_range TEXT, -- "Free", "50-100 THB", etc.
    contact_info JSONB, -- {phone, email, website, facebook}
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Restaurants table
CREATE TABLE public.restaurants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    name_thai TEXT NOT NULL,
    description TEXT NOT NULL,
    description_thai TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    location JSONB NOT NULL,
    cuisine_type cuisine_type NOT NULL,
    price_range TEXT NOT NULL, -- "Budget", "Mid-range", "Upscale"
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    contact_info JSONB,
    opening_hours JSONB,
    features TEXT[] DEFAULT '{}', -- ["wifi", "parking", "air_con", "outdoor_seating"]
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Services table
CREATE TABLE public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    name_thai TEXT NOT NULL,
    description TEXT NOT NULL,
    description_thai TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    location JSONB NOT NULL,
    service_type service_type NOT NULL,
    price_range TEXT,
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    contact_info JSONB,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Jobs table
CREATE TABLE public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    title_thai TEXT,
    company TEXT NOT NULL,
    company_thai TEXT,
    location JSONB NOT NULL,
    salary_range TEXT,
    job_type job_type NOT NULL,
    description TEXT NOT NULL,
    description_thai TEXT,
    requirements TEXT[] DEFAULT '{}',
    requirements_thai TEXT[] DEFAULT '{}',
    contact_info JSONB NOT NULL,
    status job_status DEFAULT 'active',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Reviews table
CREATE TABLE public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    entity_type entity_type NOT NULL,
    entity_id UUID NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    comment_thai TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, entity_type, entity_id)
);

-- Bookings table
CREATE TABLE public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    entity_type entity_type NOT NULL,
    entity_id UUID NOT NULL,
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status booking_status DEFAULT 'pending',
    contact_info JSONB NOT NULL, -- {name, phone, email}
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public viewing
CREATE POLICY "Public can view attractions" ON public.attractions FOR SELECT USING (true);
CREATE POLICY "Public can view restaurants" ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public can view jobs" ON public.jobs FOR SELECT USING (status = 'active');

-- RLS Policies for reviews
CREATE POLICY "Public can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_attractions_category ON public.attractions(category);
CREATE INDEX idx_attractions_rating ON public.attractions(rating DESC);
CREATE INDEX idx_attractions_featured ON public.attractions(featured) WHERE featured = true;
CREATE INDEX idx_restaurants_cuisine ON public.restaurants(cuisine_type);
CREATE INDEX idx_restaurants_rating ON public.restaurants(rating DESC);
CREATE INDEX idx_restaurants_featured ON public.restaurants(featured) WHERE featured = true;
CREATE INDEX idx_services_type ON public.services(service_type);
CREATE INDEX idx_services_rating ON public.services(rating DESC);
CREATE INDEX idx_jobs_type ON public.jobs(job_type);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_reviews_entity ON public.reviews(entity_type, entity_id);
CREATE INDEX idx_bookings_user ON public.bookings(user_id);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_attractions_updated_at BEFORE UPDATE ON public.attractions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON public.restaurants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update entity ratings based on reviews
CREATE OR REPLACE FUNCTION public.update_entity_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update rating for the entity
    IF TG_OP = 'DELETE' THEN
        -- Handle deletion
        UPDATE public.attractions 
        SET rating = COALESCE((
            SELECT ROUND(AVG(rating)::numeric, 1) 
            FROM public.reviews 
            WHERE entity_type = 'attraction' AND entity_id = OLD.entity_id
        ), 0)
        WHERE id = OLD.entity_id AND OLD.entity_type = 'attraction';
        
        UPDATE public.restaurants 
        SET rating = COALESCE((
            SELECT ROUND(AVG(rating)::numeric, 1) 
            FROM public.reviews 
            WHERE entity_type = 'restaurant' AND entity_id = OLD.entity_id
        ), 0)
        WHERE id = OLD.entity_id AND OLD.entity_type = 'restaurant';
        
        UPDATE public.services 
        SET rating = COALESCE((
            SELECT ROUND(AVG(rating)::numeric, 1) 
            FROM public.reviews 
            WHERE entity_type = 'service' AND entity_id = OLD.entity_id
        ), 0)
        WHERE id = OLD.entity_id AND OLD.entity_type = 'service';
        
        RETURN OLD;
    ELSE
        -- Handle insert/update
        UPDATE public.attractions 
        SET rating = (
            SELECT ROUND(AVG(rating)::numeric, 1) 
            FROM public.reviews 
            WHERE entity_type = 'attraction' AND entity_id = NEW.entity_id
        )
        WHERE id = NEW.entity_id AND NEW.entity_type = 'attraction';
        
        UPDATE public.restaurants 
        SET rating = (
            SELECT ROUND(AVG(rating)::numeric, 1) 
            FROM public.reviews 
            WHERE entity_type = 'restaurant' AND entity_id = NEW.entity_id
        )
        WHERE id = NEW.entity_id AND NEW.entity_type = 'restaurant';
        
        UPDATE public.services 
        SET rating = (
            SELECT ROUND(AVG(rating)::numeric, 1) 
            FROM public.reviews 
            WHERE entity_type = 'service' AND entity_id = NEW.entity_id
        )
        WHERE id = NEW.entity_id AND NEW.entity_type = 'service';
        
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update entity ratings when reviews change
CREATE TRIGGER update_entity_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_entity_rating();