// ============================================================
// NCMP Uganda – Official 2026 National Data Registry
// Comprehensive 11th Parliament (2021-2026) Data
// ============================================================

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
  contactRestricted: boolean; // Only top officials can contact
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

export type Region = "Central" | "Eastern" | "Northern" | "Western" | "Southwestern";
export type Party = "NRM" | "NUP" | "FDC" | "DP" | "UPC" | "JEEMA" | "ANT" | "PPP" | "Independent" | "UPDF";

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
  // KAMPALA
  { id: "mp-kla-01", name: "Muhammad Nsereko", constituency: "Kampala Central", district: "Kampala", region: "Central", party: "Independent", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-kla-02", name: "Shamim Malende", constituency: "Kampala Woman Representative", district: "Kampala", region: "Central", party: "NUP", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-kla-03", name: "Aloysius Mukasa", constituency: "Rubaga South", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-kla-04", name: "Abubaker Kawalya", constituency: "Rubaga North", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-kla-05", name: "Ronald Balimwezo", constituency: "Nakawa East", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-kla-06", name: "Joel Ssenyonyi", constituency: "Nakawa West", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // WAKISO
  { id: "mp-wak-01", name: "Betty Ethel Naluyima", constituency: "Wakiso Woman Representative", district: "Wakiso", region: "Central", party: "NUP", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-wak-02", name: "Ibrahim Ssemujju Nganda", constituency: "Kira Municipality", district: "Wakiso", region: "Central", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-wak-03", name: "Medard Sseggona", constituency: "Busiro East", district: "Wakiso", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-wak-04", name: "Matia Lwanga Bwanika", constituency: "Busiro North", district: "Wakiso", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // MUKONO
  { id: "mp-muk-01", name: "Betty Nambooze", constituency: "Mukono Municipality", district: "Mukono", region: "Central", party: "NUP", gender: "Female", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-muk-02", name: "Abdullah Kiwanuka", constituency: "Mukono North", district: "Mukono", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // JINJA
  { id: "mp-jin-01", name: "Manjeri Kyebakutika", constituency: "Jinja City Woman", district: "Jinja", region: "Eastern", party: "NUP", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-jin-02", name: "Timothy Lusala Batuwa", constituency: "Jinja West", district: "Jinja", region: "Eastern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // MBALE
  { id: "mp-mba-01", name: "Connie Nakayenze Galiwango", constituency: "Mbale City Woman", district: "Mbale", region: "Eastern", party: "Independent", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-mba-02", name: "Seth Wambede", constituency: "Northern Division", district: "Mbale", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // GULU
  { id: "mp-gul-01", name: "Betty Aol Ocan", constituency: "Gulu City Woman", district: "Gulu", region: "Northern", party: "FDC", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-gul-02", name: "Ojara Martin Mapenduzi", constituency: "Bardege-Layibi Division", district: "Gulu", region: "Northern", party: "Independent", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // MBARARA
  { id: "mp-mbr-01", name: "Rita Atukwasa", constituency: "Mbarara City Woman", district: "Mbarara", region: "Western", party: "Independent", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-mbr-02", name: "Mwine Mpaka", constituency: "Mbarara City South", district: "Mbarara", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // ARUA
  { id: "mp-aru-01", name: "Mourine Osoru", constituency: "Arua City Woman", district: "Arua", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-aru-02", name: "Jackson Atima", constituency: "Arua Central Division", district: "Arua", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  
  // UPDF
  { id: "mp-updf-01", name: "Gen. David Muhoozi", constituency: "UPDF Representative", district: "National", region: "Central", party: "UPDF", gender: "Male", type: "UPDF", term: "2021-2026", verified: true },
  { id: "mp-updf-02", name: "Lt. Gen. James Mugira", constituency: "UPDF Representative", district: "National", region: "Central", party: "UPDF", gender: "Male", type: "UPDF", term: "2021-2026", verified: true },
];

export const REGIONS: Region[] = ["Central", "Eastern", "Northern", "Western", "Southwestern"];

export const partyStats = Object.keys(PARTIES).map(party => ({
  party: party as Party,
  count: allMPs.filter(m => m.party === party).length,
  fullName: PARTIES[party as Party].fullName,
  color: PARTIES[party as Party].color,
})).filter(p => p.count > 0);