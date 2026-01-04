namespace WebApplication3.Models
{
    public class ParkSection
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ParkSection(string name)
        {
            Name = name;
            Id = default(Guid);
        }
    }

    public class Attraction
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public ParkSection Park { get; set; }
        public Attraction(string name, string type, ParkSection park)
        {
            Name = name;
            Type = type;
            Park = park;
        }
    }

    public class AttractionQueue
    {
        public TimeSpan CalculateWaitTime(Attraction attraction)
        {
            var result = TimeSpan.Zero;

            switch (attraction.Park.Name)
            {
                case "Western":
                    result = TimeSpan.FromMinutes(10);
                    break;

                case "Space":
                    result = TimeSpan.FromHours(1);
                    break;

                case "American":
                    result = TimeSpan.FromMinutes(20);
                    break;

                case "High Seas":
                    result = TimeSpan.FromMinutes(45);
                    break;
            }

            return result;
        }
    }
}