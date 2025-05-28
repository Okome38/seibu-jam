namespace seibuDatabase.Models
{
    public class DonCounter
    {
        public int donCount { get; set; }
        public int nonDonCount { get; set; }
        public DateTime lastUpdated { get; set; }
        public string lastUpdatedBy { get; set; }
    }
}
