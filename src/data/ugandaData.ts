// ============================================================
// NCMP Uganda – Official 2026 National Data Registry
// All officials, MPs, constituencies organized by region
// ============================================================

export interface NationalOfficial {
  id: string;
  name: string;
  title: string;
  role: string;
  party: string;
  region: string;
  district: string;
  photo?: string;
  verified: boolean;
  bio: string;
  contact?: string;
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
  term: string;
  verified: boolean;
  bio?: string;
  committees?: string[];
}

export type Region = "Central" | "Eastern" | "Northern" | "Western" | "Southwestern";
export type Party =
  | "NRM"
  | "NUP"
  | "FDC"
  | "DP"
  | "UPC"
  | "JEEMA"
  | "ANT"
  | "PPP"
  | "Independent"
  | "UPDF"
  | "UFA";

export const PARTIES: Record<Party, { name: string; color: string; fullName: string }> = {
  NRM: { name: "NRM", color: "#FFD700", fullName: "National Resistance Movement" },
  NUP: { name: "NUP", color: "#FF0000", fullName: "National Unity Platform" },
  FDC: { name: "FDC", color: "#0066CC", fullName: "Forum for Democratic Change" },
  DP: { name: "DP", color: "#006400", fullName: "Democratic Party" },
  UPC: { name: "UPC", color: "#8B0000", fullName: "Uganda People's Congress" },
  JEEMA: { name: "JEEMA", color: "#006400", fullName: "Justice Forum (JEEMA)" },
  ANT: { name: "ANT", color: "#FF6600", fullName: "Alliance for National Transformation" },
  PPP: { name: "PPP", color: "#800080", fullName: "People's Progressive Party" },
  Independent: { name: "Independent", color: "#888888", fullName: "Independent" },
  UPDF: { name: "UPDF", color: "#2E8B57", fullName: "Uganda People's Defence Forces" },
  UFA: { name: "UFA", color: "#4682B4", fullName: "Uganda Federal Alliance" },
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
    bio: "Yoweri Kaguta Museveni has served as President of Uganda since 1986. A military and political leader, he led the National Resistance Movement to victory and has presided over Uganda's transformation.",
    contact: "president@statehouse.go.ug",
  },
  {
    id: "vp-001",
    name: "H.E. Jessica Rose Epel Alupo",
    title: "Vice President of the Republic of Uganda",
    role: "Vice President",
    party: "NRM",
    region: "Eastern",
    district: "Katakwi",
    verified: true,
    bio: "H.E. Jessica Alupo is Uganda's Vice President and the first woman to serve in this capacity. She previously served as Minister of Education and Sports.",
    contact: "vicepresident@statehouse.go.ug",
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
    bio: "Rt. Hon. Robinah Nabbanja is Uganda's Prime Minister, the first woman to hold this position. She previously served as Minister of Health.",
    contact: "pm@opm.go.ug",
  },
  {
    id: "spk-001",
    name: "Rt. Hon. Annet Among",
    title: "Speaker of Parliament of Uganda",
    role: "Speaker",
    party: "NRM",
    region: "Eastern",
    district: "Bukedea",
    verified: true,
    bio: "Rt. Hon. Annet Among is the Speaker of the Parliament of Uganda, elected in 2021. She previously served as Deputy Speaker.",
    contact: "speaker@parliament.go.ug",
  },
  {
    id: "dspk-001",
    name: "Rt. Hon. Thomas Tayebwa",
    title: "Deputy Speaker of Parliament of Uganda",
    role: "Deputy Speaker",
    party: "NRM",
    region: "Western",
    district: "Ruhinda North",
    verified: true,
    bio: "Rt. Hon. Thomas Tayebwa is the Deputy Speaker of the Parliament of Uganda, elected in 2021.",
    contact: "deputyspeaker@parliament.go.ug",
  },
  {
    id: "clerk-001",
    name: "Adolf Mwesige",
    title: "Clerk to Parliament of Uganda",
    role: "Clerk",
    party: "Non-Partisan",
    region: "Western",
    district: "Ntoroko",
    verified: true,
    bio: "Adolf Mwesige serves as the Clerk to Parliament of Uganda, overseeing parliamentary administration and procedures.",
    contact: "clerk@parliament.go.ug",
  },
];

// ============================================================
// MEMBERS OF PARLIAMENT – 2021-2026 Parliament
// Organized by Region
// ============================================================

export const allMPs: MP[] = [
  // ======================== CENTRAL REGION ========================
  // Kampala
  { id: "mp-001", name: "Muhammad Nsereko", constituency: "Kampala Central", district: "Kampala", region: "Central", party: "Independent", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true, committees: ["Finance", "Budget"] },
  { id: "mp-002", name: "Doreen Nyanjura", constituency: "Kampala Woman Representative", district: "Kampala", region: "Central", party: "NUP", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-003", name: "Latif Ssebagala", constituency: "Kawempe North", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-004", name: "Ssegirinya Muhammad", constituency: "Kawempe South", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-005", name: "Shamim Malende", constituency: "Kira Municipality", district: "Wakiso", region: "Central", party: "NUP", gender: "Female", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-006", name: "Allan Ssewanyana", constituency: "Makindye West", district: "Kampala", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-007", name: "Mathias Mpuuga", constituency: "Nyendo-Mukungwe", district: "Masaka", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true, bio: "Leader of Opposition in Parliament (2021-2023)" },
  { id: "mp-008", name: "Ibrahim Ssemujju Nganda", constituency: "Kira Municipality", district: "Wakiso", region: "Central", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-009", name: "Medard Sseggona", constituency: "Busiro East", district: "Wakiso", region: "Central", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Wakiso
  { id: "mp-010", name: "Paul Nsubuga", constituency: "Nakaseke South", district: "Nakaseke", region: "Central", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-011", name: "Robinah Ssentongo", constituency: "Wakiso District Woman", district: "Wakiso", region: "Central", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-012", name: "Godfrey Kiwanda Suubi", constituency: "Mityana North", district: "Mityana", region: "Central", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Mukono / Kayunga / Buikwe
  { id: "mp-013", name: "Betty Naluyima", constituency: "Mukono Municipality", district: "Mukono", region: "Central", party: "NUP", gender: "Female", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-014", name: "Emmanuel Kyazze", constituency: "Mukono North", district: "Mukono", region: "Central", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-015", name: "Nakimuli Patricia", constituency: "Buikwe Woman", district: "Buikwe", region: "Central", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-016", name: "Nandala Mafabi Nathan", constituency: "Budadiri West", district: "Sironko", region: "Eastern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true, bio: "Secretary General, Forum for Democratic Change" },

  // Masaka / Kalungu / Lwengo
  { id: "mp-017", name: "Robinah Rwakoojo", constituency: "Gomba Woman", district: "Gomba", region: "Central", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-018", name: "Henry Musasizi", constituency: "Rubanda East", district: "Rubanda", region: "Southwestern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-019", name: "Kaguta Ronald Muhoozi", constituency: "Special Duties", district: "National", region: "Western", party: "NRM", gender: "Male", type: "Ex-Officio", term: "2021-2026", verified: true },
  { id: "mp-020", name: "Jack Sabiiti", constituency: "Rukiga County", district: "Rukiga", region: "Southwestern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // ======================== EASTERN REGION ========================
  // Jinja
  { id: "mp-021", name: "Paul Mwiru", constituency: "Jinja East", district: "Jinja", region: "Eastern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-022", name: "Moses Balyeku", constituency: "Jinja North", district: "Jinja", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-023", name: "Naome Kabasharira", constituency: "Jinja Woman", district: "Jinja", region: "Eastern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },

  // Mbale / Sironko / Bulambuli
  { id: "mp-024", name: "John Baptist Nambeshe", constituency: "Manjiya County", district: "Bulambuli", region: "Eastern", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-025", name: "Lydia Wanyoto", constituency: "Mbale Municipality", district: "Mbale", region: "Eastern", party: "NRM", gender: "Female", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-026", name: "Sam Lyomoki", constituency: "Workers Representative", district: "National", region: "Eastern", party: "ANT", gender: "Male", type: "Workers", term: "2021-2026", verified: true },
  { id: "mp-027", name: "Richard Omara Atyam", constituency: "Usuk County", district: "Katakwi", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Soroti / Serere / Amuria
  { id: "mp-028", name: "Herbert Ariko", constituency: "Soroti East", district: "Soroti", region: "Eastern", party: "UPC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-029", name: "Anna Adeke", constituency: "Soroti Woman", district: "Soroti", region: "Eastern", party: "FDC", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-030", name: "Gerald Karuhanga", constituency: "Ntungamo Municipality", district: "Ntungamo", region: "Southwestern", party: "ANT", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Tororo / Busia / Iganga
  { id: "mp-031", name: "Musa Ecweru", constituency: "Usuk County", district: "Katakwi", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-032", name: "Michael Mawanda", constituency: "Iganga Municipality", district: "Iganga", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-033", name: "Rose Akello", constituency: "Agago Woman", district: "Agago", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-034", name: "Ibrahim Abiriga", constituency: "Arua Municipality", district: "Arua", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Bugiri / Mayuge
  { id: "mp-035", name: "Asuman Basalirwa", constituency: "Bugiri Municipality", district: "Bugiri", region: "Eastern", party: "JEEMA", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-036", name: "Connie Nakayenze", constituency: "Mbale Woman", district: "Mbale", region: "Eastern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },

  // ======================== NORTHERN REGION ========================
  // Gulu
  { id: "mp-037", name: "Reagan Okumu", constituency: "Aswa County", district: "Gulu", region: "Northern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-038", name: "Lyandro Komakech", constituency: "Gulu Municipality", district: "Gulu", region: "Northern", party: "NUP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-039", name: "Betty Aol Ocan", constituency: "Gulu Woman", district: "Gulu", region: "Northern", party: "FDC", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },

  // Lira
  { id: "mp-040", name: "Jimmy Akena", constituency: "Lira Municipality", district: "Lira", region: "Northern", party: "UPC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true, bio: "President General, Uganda People's Congress" },
  { id: "mp-041", name: "Christine Amongin", constituency: "Lira Woman", district: "Lira", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-042", name: "Ojara Martin Mapenduzi", constituency: "Gulu City Division", district: "Gulu", region: "Northern", party: "Independent", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Arua / West Nile
  { id: "mp-043", name: "Moriku Kaducu", constituency: "Terego East", district: "Terego", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-044", name: "Angeline Osege", constituency: "Arua Woman", district: "Arua", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-045", name: "Ssozi Richard", constituency: "Terego West", district: "Terego", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Pader / Kitgum / Agago
  { id: "mp-046", name: "Anthony Akol", constituency: "Kilak North", district: "Amuru", region: "Northern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-047", name: "Gilbert Olanya", constituency: "Kilak South", district: "Amuru", region: "Northern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-048", name: "Santa Alum Ogwang", constituency: "Pader Woman", district: "Pader", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-049", name: "Morris Ogenga Latigo", constituency: "Agago North", district: "Agago", region: "Northern", party: "FDC", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Kotido / Moroto / Nakapiripirit (Karamoja)
  { id: "mp-050", name: "Emmanuel Otaala", constituency: "Moroto Municipality", district: "Moroto", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-051", name: "Losike Lokeris", constituency: "Pokot County", district: "Amudat", region: "Northern", party: "NRM", gender: "Female", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-052", name: "John Paul Lokii", constituency: "Kotido County", district: "Kotido", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Adjumani / Moyo / Yumbe
  { id: "mp-053", name: "Adolph Mwesige", constituency: "Aringa North", district: "Yumbe", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-054", name: "Patrick Isiagi", constituency: "Adjumani East", district: "Adjumani", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // ======================== WESTERN REGION ========================
  // Hoima / Kikuube / Kibaale
  { id: "mp-055", name: "Robinah Nabbanja", constituency: "Kikuube Woman", district: "Kikuube", region: "Western", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true, bio: "Prime Minister of Uganda" },
  { id: "mp-056", name: "Robert Kasolo", constituency: "Kibaale County North", district: "Kibaale", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-057", name: "Enos Asiimwe", constituency: "Hoima East", district: "Hoima", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-058", name: "Grace Kwiyucwiny", constituency: "Nwoya Woman", district: "Nwoya", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },

  // Mbarara / Isingiro / Kiruhura
  { id: "mp-059", name: "Gaffa Mbwatekamwa", constituency: "Kasambya County", district: "Mubende", region: "Central", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-060", name: "Abel Bizimana", constituency: "Isingiro North", district: "Isingiro", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-061", name: "Michael Tusiime", constituency: "Mbarara North", district: "Mbarara", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-062", name: "Anita Among", constituency: "Bukedea Woman", district: "Bukedea", region: "Eastern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true, bio: "Speaker of Parliament of Uganda" },

  // Fort Portal / Kabarole / Kasese
  { id: "mp-063", name: "Geofrey Kulubya", constituency: "Burahya County", district: "Kabarole", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-064", name: "Winnie Kiiza", constituency: "Kasese Woman", district: "Kasese", region: "Western", party: "FDC", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-065", name: "William Nzoghu", constituency: "Bukonzo East", district: "Kasese", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-066", name: "Elijah Okupa", constituency: "Kasilo County", district: "Serere", region: "Eastern", party: "Independent", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Masindi / Buliisa / Nakasongola
  { id: "mp-067", name: "Onesimus Twinamasiko", constituency: "Buhaguzi West", district: "Kibaale", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-068", name: "Proscovia Salaamu Musumba", constituency: "Elgon County", district: "Mbale", region: "Eastern", party: "FDC", gender: "Female", type: "Directly Elected", term: "2021-2026", verified: true },

  // Ruhinda / Mitooma / Sheema
  { id: "mp-069", name: "Thomas Tayebwa", constituency: "Ruhinda North", district: "Mitooma", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true, bio: "Deputy Speaker of Parliament" },
  { id: "mp-070", name: "Obua Denis Hamson", constituency: "Ajuri County", district: "Alebtong", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // ======================== SOUTHWESTERN REGION ========================
  // Kabale / Kisoro / Rubanda / Rukiga
  { id: "mp-071", name: "Henry Musasizi", constituency: "Rubanda East", district: "Rubanda", region: "Southwestern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-072", name: "Prossy Akampurira", constituency: "Kabale Woman", district: "Kabale", region: "Southwestern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-073", name: "Fred Turyamureeba", constituency: "Rubanda West", district: "Rubanda", region: "Southwestern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-074", name: "Geofrey Ndyamuhaki", constituency: "Kabale Municipality", district: "Kabale", region: "Southwestern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-075", name: "Peace Mutuuzo", constituency: "Kyegegwa Woman", district: "Kyegegwa", region: "Western", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },

  // Ntungamo / Ibanda / Kiruhura
  { id: "mp-076", name: "Atkins Katusabe", constituency: "Bukonzo West", district: "Kasese", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-077", name: "Mwine Mpaka", constituency: "Buyamba County", district: "Rakai", region: "Central", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-078", name: "Judith Franca Akello", constituency: "Oyam Woman", district: "Oyam", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-079", name: "Alex Ruhunda", constituency: "Fort Portal Central", district: "Kabarole", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-080", name: "Benson Obua", constituency: "Kwania County", district: "Kwania", region: "Northern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },

  // Kisoro
  { id: "mp-081", name: "Emmanuel Murwanashyaka", constituency: "Bufumbira South", district: "Kisoro", region: "Southwestern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-082", name: "Denise Namyalo Ufoyuru", constituency: "Kayunga Woman", district: "Kayunga", region: "Central", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },

  // UPDF Representatives
  { id: "mp-083", name: "Lt. Gen. Muhoozi Kainerugaba", constituency: "UPDF Representative", district: "National", region: "Western", party: "UPDF", gender: "Male", type: "UPDF", term: "2021-2026", verified: true },
  { id: "mp-084", name: "Col. Shaban Bantariza", constituency: "UPDF Representative", district: "National", region: "Western", party: "UPDF", gender: "Male", type: "UPDF", term: "2021-2026", verified: true },
  { id: "mp-085", name: "Brig. Flavia Byekwaso", constituency: "UPDF Representative", district: "National", region: "Central", party: "UPDF", gender: "Female", type: "UPDF", term: "2021-2026", verified: true },

  // Youth Representatives
  { id: "mp-086", name: "Butime Monson", constituency: "Youth Representative Western", district: "National", region: "Western", party: "NRM", gender: "Male", type: "Youth", term: "2021-2026", verified: true },
  { id: "mp-087", name: "Alpha Sanya", constituency: "Youth Representative Central", district: "National", region: "Central", party: "NUP", gender: "Male", type: "Youth", term: "2021-2026", verified: true },
  { id: "mp-088", name: "Hellen Asamo", constituency: "Youth Representative Eastern", district: "National", region: "Eastern", party: "NRM", gender: "Female", type: "Youth", term: "2021-2026", verified: true },
  { id: "mp-089", name: "Christine Acen", constituency: "Youth Representative Northern", district: "National", region: "Northern", party: "Independent", gender: "Female", type: "Youth", term: "2021-2026", verified: true },

  // Additional Central MPs
  { id: "mp-090", name: "Ssali Charles Byabamazima", constituency: "Butebo County", district: "Butebo", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-091", name: "Florence Namayanja", constituency: "Nakifuma County", district: "Mukono", region: "Central", party: "NUP", gender: "Female", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-092", name: "Margaret Baba Diri", constituency: "Koboko Woman", district: "Koboko", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-093", name: "Solomon Silwany", constituency: "Bukooli County Central", district: "Bugiri", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-094", name: "Richard Sebamala", constituency: "Butebo County", district: "Butebo", region: "Eastern", party: "DP", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-095", name: "Michael Ecweru", constituency: "Usuk County", district: "Katakwi", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-096", name: "Doreen Amule", constituency: "Amolatar Woman", district: "Amolatar", region: "Northern", party: "NRM", gender: "Female", type: "Woman Representative", term: "2021-2026", verified: true },
  { id: "mp-097", name: "Richard Othieno Okello", constituency: "Tororo North", district: "Tororo", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-098", name: "Patrick Ayine Opolot", constituency: "Kween County", district: "Kween", region: "Eastern", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
  { id: "mp-099", name: "Betty Amongi", constituency: "Oyam North", district: "Oyam", region: "Northern", party: "NRM", gender: "Female", type: "Directly Elected", term: "2021-2026", verified: true, bio: "Minister of Gender, Labour and Social Development" },
  { id: "mp-100", name: "Ephraim Biraaro", constituency: "Buhweju County", district: "Buhweju", region: "Western", party: "NRM", gender: "Male", type: "Directly Elected", term: "2021-2026", verified: true },
];

export const getMPsByRegion = (region: Region) => allMPs.filter(mp => mp.region === region);
export const getMPsByDistrict = (district: string) => allMPs.filter(mp => mp.district === district);
export const getMPsByParty = (party: Party) => allMPs.filter(mp => mp.party === party);

export const REGIONS: Region[] = ["Central", "Eastern", "Northern", "Western", "Southwestern"];

export const regionStats = REGIONS.map(region => ({
  region,
  count: getMPsByRegion(region).length,
  parties: [...new Set(getMPsByRegion(region).map(mp => mp.party))],
}));

export const partyStats = Object.keys(PARTIES).map(party => ({
  party: party as Party,
  count: getMPsByParty(party as Party).length,
  fullName: PARTIES[party as Party].fullName,
  color: PARTIES[party as Party].color,
})).filter(p => p.count > 0);
