import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Sparkles } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from "date-fns";

const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample events data - in real app this would come from Supabase
  const events = [
    {
      id: 1,
      title: "Phasuk Temple Festival",
      titleThai: "งานประเพณีวัดภาสุข",
      date: "2024-03-15",
      time: "06:00 - 18:00",
      location: "Phasuk Temple",
      locationThai: "วัดภาสุข",
      description: "Annual temple festival celebrating the local patron saint with traditional ceremonies, food stalls, and cultural performances.",
      category: "Religious",
      attendees: "500+",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Harvest Festival",
      titleThai: "งานเทศกาลเก็บเกี่ยว",
      date: "2024-03-22",
      time: "08:00 - 16:00",
      location: "Nong Kung Thap Ma Community Center",
      locationThai: "ศูนย์ชุมชนหนองกุงทับม้า",
      description: "Celebrate the rice harvest season with traditional games, local food, and farming demonstrations.",
      category: "Cultural",
      attendees: "300+",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Wang Yai Park Music Festival",
      titleThai: "เทศกาลดนตรีสวนวังใหญ่",
      date: "2024-04-05",
      time: "17:00 - 22:00",
      location: "Wang Yai Park",
      locationThai: "สวนวังใหญ่",
      description: "Evening music festival featuring local bands and traditional Thai music performances under the stars.",
      category: "Entertainment",
      attendees: "200+",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Local Handicraft Fair",
      titleThai: "งานงานฝีมือท้องถิ่น",
      date: "2024-04-12",
      time: "09:00 - 17:00",
      location: "Wang Sam Mo Market",
      locationThai: "ตลาดวังสามหมอ",
      description: "Showcase of local artisans featuring handmade crafts, textiles, and traditional pottery.",
      category: "Cultural",
      attendees: "150+",
      image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Songkran Water Festival",
      titleThai: "เทศกาลสงกรานต์",
      date: "2024-04-13",
      time: "10:00 - 16:00",
      location: "Town Center",
      locationThai: "ใจกลางเมือง",
      description: "Traditional Thai New Year celebration with water splashing, merit-making, and community activities.",
      category: "Religious",
      attendees: "1000+",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop"
    }
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(parseISO(event.date), date)
    );
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Religious: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Cultural: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Entertainment: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Sports: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Events Calendar</h2>
        <h3 className="text-xl text-muted-foreground mb-6">ปฏิทินกิจกรรม</h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Stay updated with local festivals, cultural events, and community activities happening 
          throughout Wang Sam Mo and surrounding areas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {format(currentDate, 'MMMM yyyy')}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={previousMonth}>
                    ←
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    →
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map(day => {
                  const dayEvents = getEventsForDate(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className={`p-2 min-h-16 border rounded cursor-pointer transition-colors ${
                        isSameMonth(day, currentDate) 
                          ? 'hover:bg-muted' 
                          : 'text-muted-foreground bg-muted/50'
                      } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="text-sm font-medium">{format(day, 'd')}</div>
                      {dayEvents.map(event => (
                        <div key={event.id} className="text-xs bg-primary/20 text-primary rounded px-1 mt-1 truncate">
                          {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{event.titleThai}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(parseISO(event.date), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.attendees} expected
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Event Details for Selected Date */}
          {selectedDate && getEventsForDate(selectedDate).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Events on {format(selectedDate, 'MMM d, yyyy')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className="space-y-2">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-32 object-cover rounded"
                    />
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.titleThai}</p>
                    <p className="text-sm">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Event Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Badge className={getCategoryColor('Religious')}>Religious Festivals</Badge>
          <Badge className={getCategoryColor('Cultural')}>Cultural Events</Badge>
          <Badge className={getCategoryColor('Entertainment')}>Entertainment</Badge>
          <Badge className={getCategoryColor('Sports')}>Sports Activities</Badge>
        </div>
        <p className="text-muted-foreground text-sm mt-2">
          Want to add your event to our calendar? Contact us to feature your community event.
        </p>
      </div>
    </div>
  );
};

export default EventsCalendar;