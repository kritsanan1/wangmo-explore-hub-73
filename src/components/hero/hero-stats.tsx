import { HERO_STATS } from "@/constants/categories";

export function HeroStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 max-w-4xl mx-auto">
      {HERO_STATS.map((stat, index) => (
        <div key={index} className="text-center">
          <div className={`text-3xl lg:text-4xl font-bold mb-2 ${stat.colorClass}`}>
            {stat.value}
          </div>
          <div className="text-white/80">{stat.label}</div>
          <div className="text-sm text-white/60">{stat.labelThai}</div>
        </div>
      ))}
    </div>
  );
}