namespace WebApplication3.Models;

public record ParkSection(Guid Id, string Name)
{
    public ParkSection(string name) : this(Guid.NewGuid(), name) { }
}

public record Attraction(string Name, string Type, ParkSection Park);

public sealed class AttractionQueue
{
    public TimeSpan CalculateWaitTime(Attraction attraction) =>
            attraction.Park.Name switch
            {
                "Western"   => TimeSpan.FromMinutes(10),
                "Space"     => TimeSpan.FromHours(1),
                "American"  => TimeSpan.FromMinutes(20),
                "High Seas" => TimeSpan.FromMinutes(45),
                _           => TimeSpan.Zero
            };
}