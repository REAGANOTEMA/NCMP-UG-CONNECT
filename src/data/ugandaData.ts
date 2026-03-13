// ============================================================
// NCMP Uganda – Official 2026 National Data Registry
// Comprehensive 11th Parliament (2021-2026) Data
// ============================================================

export type Region = "Central" | "Eastern" | "Northern" | "Western" | "Southwestern";
export type Party = "NRM" | "NUP" | "FDC" | "DP" | "UPC" | "JEEMA" | "ANT" | "PPP" | "Independent" | "UPDF";
export type Role = 'citizen' | 'mp' | 'speaker' | 'clerk' | 'official' | 'staff';

export interface NationalOfficial {
  id: string;
  name: string;
  title: string;
  role: 'President' | 'Vice President' | 'Prime Minister' | 'Speaker' | 'Deputy Speaker' | 'Cabinet';
  party: string;
  region: string;
  district: string;
  verified: boolean;
  bio: string;
  contactRestricted: boolean; 
}

export interface MP {
  id: string;
  name: string;
  constituency: string;
  district: string;
  region: Region;
  party: Party;
  gender: "Male" | "Female";
  type: "Directly Elected" | "Woman Representative" | "UPDF" | "Youth" | "Workers" | "PWD" | "Ex-Officio";
  term: "2021-2026";
  verified: boolean;
  bio?: string;
}

export interface Petition {
  id: string;
  title: string;
  description: string;
  category: string;
  signatures: number;
  target: number;
  status: 'Active' | 'Under Review' | 'Presented' | 'Closed';
  author: string;
  dateCreated: string;
  constituency?: string;
}

export const PARTIES: Record<Party, { name: string; color: string; fullName: string }> = {
  NRM: { name: "NRM", color: "#FFD700", fullName: "National Resistance Movement" },
  NUP: { name: "NUP", color: "#FF0000", fullName: "National Unity Platform" },
  FDC: { name: "FDC", color: "#0066CC", fullName: "Forum for Democratic Change" },
  DP: { name: "DP", color: "#006400", fullName: "Democratic Party" },
  UPC: { name: "UPC", color: "#8B0000", fullName: "Uganda People's Congress" },
  JEEMA: { name: "JEEMA", color: "#006400", fullName: "Justice Forum" },
  ANT: { name: "ANT", color: "#FF6600", fullName: "Alliance for National Transformation" },
  PPP: { name: "PPP", color: "#800080", fullName: "People's Progressive Party" },
  Independent: { name: "Independent", color: "#888888", fullName: "Independent" },
  UPDF: { name: "UPDF", color: "#2E8B57", fullName: "Uganda People's Defence Forces" },
};

export const nationalOfficials: NationalOfficial[] = [
  {
    id: "pres-001",
    name: "H.E. Gen. Yoweri Kaguta Museveni",
    title: "President of the Republic of Uganda",
    role: "President",
    party: "NRM",
    region: "Western",
    district: "Kiruhura",
    verified: true,
    bio: "President of Uganda since 1986.",
    contactRestricted: true,
  },
  {
    id: "vp-001",
    name: "H.E. Jessica Rose Epel Alupo",
    title: "Vice President of Uganda",
    role: "Vice President",
    party: "NRM",
    region: "Eastern",
    district: "Katakwi",
    verified: true,
    bio: "Vice President of the Republic of Uganda.",
    contactRestricted: true,
  },
  {
    id: "pm-001",
    name: "Rt. Hon. Robinah Nabbanja",
    title: "Prime Minister of Uganda",
    role: "Prime Minister",
    party: "NRM",
    region: "Western",
    district: "Kibaale",
    verified: true,
    bio: "Prime Minister and Leader of Government Business.",
    contactRestricted: true,
  },
  {
    id: "spk-001",
    name: "Rt. Hon. Anita Annet Among",
    title: "Speaker of Parliament",
    role: "Speaker",
    party: "NRM",
    region: "Eastern",
    district: "Bukedea",
    verified: true,
    bio: "Speaker of the 11th Parliament.",
    contactRestricted: false,
  }
];

export const allMPs: MP[] = [
  // CENTRAL REGION
  { id: "mp-001", name: "Muhammad Nsereko", constituency: "Kampala Central", district: "Kampala", region: "Central", party: "Independent", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-002", name: "Shamim Malende", constituency: "Kampala Woman", district: "Kampala", region: "Central", party: "NUP", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-003", name: "Joel Ssenyonyi", constituency: "Nakawa West", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-004", name: "Ronald Balimwezo", constituency: "Nakawa East", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-005", name: "Aloysius Mukasa", constituency: "Rubaga South", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-006", name: "Abubaker Kawalya", constituency: "Rubaga North", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-007", name: "Ibrahim Ssemujju Nganda", constituency: "Kira Municipality", district: "Wakiso", region: "Central", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-008", name: "Betty Nambooze", constituency: "Mukono Municipality", district: "Mukono", region: "Central", party: "NUP", gender: "Female", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-009", name: "Medard Sseggona", constituency: "Busiro East", district: "Wakiso", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-010", name: "Matthias Mpuuga", constituency: "Nyendo-Mukungwe", district: "Masaka", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-011", name: "Abel Bwanika", constituency: "Kimaanya-Kabungo", district: "Masaka", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-012", name: "Joyce Bagala", constituency: "Mityana Woman", district: "Mityana", region: "Central", party: "NUP", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-013", name: "Francis Zaake", constituency: "Mityana Municipality", district: "Mityana", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-014", name: "Hillary Kiyaga", constituency: "Mawokota North", district: "Mpigi", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // EASTERN REGION
  { id: "mp-101", name: "Anita Annet Among", constituency: "Bukedea Woman", district: "Bukedea", region: "Eastern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-103", name: "Timothy Batuwa", constituency: "Jinja West", district: "Jinja", region: "Eastern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-104", name: "Asuman Basalirwa", constituency: "Bugiri Municipality", district: "Bugiri", region: "Eastern", party: "JEEMA", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-105", name: "Geofrey Lutaaya", constituency: "Kakuuto County", district: "Kyotera", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-106", name: "Nathan Nandala-Mafabi", constituency: "Budadiri West", district: "Sironko", region: "Eastern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-107", name: "Connie Galiwango", constituency: "Mbale City Woman", district: "Mbale", region: "Eastern", party: "Independent", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-108", name: "Karim Masaba", constituency: "Mbale Industrial Division", district: "Mbale", region: "Eastern", party: "Independent", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-109", name: "Sarah Opendi", constituency: "Tororo Woman", district: "Tororo", region: "Eastern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  
  // NORTHERN REGION
  { id: "mp-201", name: "Betty Aol Ocan", constituency: "Gulu City Woman", district: "Gulu", region: "Northern", party: "FDC", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-202", name: "Anthony Akol", constituency: "Kilak North", district: "Amuru", region: "Northern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-203", name: "Judith Alyek", constituency: "Kole Woman", district: "Kole", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-204", name: "Gilbert Olanya", constituency: "Kilak South", district: "Amuru", region: "Northern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-205", name: "Lyandro Komakech", constituency: "Gulu Municipality", district: "Gulu", region: "Northern", party: "DP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-206", name: "Jimmy Akena", constituency: "Lira City East", district: "Lira", region: "Northern", party: "UPC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-207", name: "Jane Ruth Aceng", constituency: "Lira City Woman", district: "Lira", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  
  // WESTERN REGION
  { id: "mp-102", name: "Thomas Tayebwa", constituency: "Ruhinda North", district: "Mitooma", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-301", name: "Mwine Mpaka", constituency: "Mbarara City South", district: "Mbarara", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-302", name: "Alex Ruhunda", constituency: "Fort Portal Central", district: "Fort Portal", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-303", name: "Catherine Ndamira", constituency: "Kabale Woman", district: "Kabale", region: "Western", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-304", name: "Wilfred Niwagaba", constituency: "Ndorwa East", district: "Kabale", region: "Western", party: "Independent", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-305", name: "David Bahati", constituency: "Ndorwa West", district: "Kabale", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-306", name: "Frank Tumwebaze", constituency: "Kibale East", district: "Kamwenge", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // SOUTHWESTERN REGION
  { id: "mp-401", name: "Sarah Mateke", constituency: "Kisoro Woman", district: "Kisoro", region: "Southwestern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-402", name: "James Nsaba Buturo", constituency: "Bufumbira East", district: "Kisoro", region: "Southwestern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-403", name: "John Kamara", constituency: "Bufumbira North", district: "Kisoro", region: "Southwestern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // SPECIAL INTEREST GROUPS
  { id: "mp-501", name: "Gen. David Muhoozi", constituency: "UPDF Representative", district: "National", region: "Central", party: "UPDF", gender: "Male", type: "UPDF", term: "2021-2026", verified: true },
  { id: "mp-502", name: "Phiona Nyamutoro", constituency: "National Female Youth", district: "National", region: "Central", party: "NRM", gender: "Female", type: "Youth", term: "2021-2026", verified: true },
  { id: "mp-503", name: "Bumali Mpindi", constituency: "PWD Representative", district: "National", region: "Central", party: "Independent", gender: "Male", type: "PWD", term: "2021-2026", verified: true },
];

export const REGIONS: Region[] = ["Central", "Eastern", "Northern", "Western", "Southwestern"];

export const DISTRICTS = Array.from(new Set(allMPs.map(mp => mp.district))).sort();

export const partyStats = Object.keys(PARTIES).map(party => ({
  party: party as Party,
  count: allMPs.filter(m => m.party === party).length,
  fullName: PARTIES[party as Party].fullName,
  color: PARTIES[party as Party].color,
})).filter(p => p.count > 0);

export const mockPetitions: Petition[] = [
  {
    id: "pet-001",
    title: "Improve Drainage Systems in Kampala Central",
    description: "A formal request to the Ministry of Works to address the recurring flooding issues on Jinja Road and surrounding areas.",
    category: "Infrastructure",
    signatures: 12450,
    target: 20000,
    status: "Active",
    author: "John Doe",
    dateCreated: "2026-01-15",
    constituency: "Kampala Central"
  },
  {
    id: "pet-002",
    title: "Increase Funding for Rural Health Centers in Gulu",
    description: "Petition to Parliament to allocate more funds for medical supplies and staff in Northern Uganda sub-counties.",
    category: "Health",
    signatures: 8900,
    target: 10000,
    status: "Under Review",
    author: "Sarah Akello",
    dateCreated: "2025-12-10",
    constituency: "Gulu City"
  },
  {
    id: "pet-003",
    title: "Protect Mabira Forest from Encroachment",
    description: "National petition to the NEMA and Ministry of Water to enforce stricter boundaries for Mabira Forest.",
    category: "Environment",
    signatures: 45000,
    target: 50000,
    status: "Presented",
    author: "Environmental Watch Uganda",
    dateCreated: "2025-11-20"
  }
];