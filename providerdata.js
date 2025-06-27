
/* If a practice as opposed to an office, use a generic descriptor in the practice setting */
/* Used shortened address */
/* Credentials cannot be too many characters so they fit */

window.providerData = [
  {
    id: 1,
    name: "Capitol Dental Excellence",
    practice: "Private Practice ",
    address: "1200 K St NW, Ste 300, DC 20005", 
    lat: 38.9022,
    lng: -77.0369,
    phone: "(202) 555-0123",
    distance: "", // Will be calculated dynamically
    rating: 4.9,
    reviewCount: 247,
    website: "capitoldentalexc.com",
    
    primarySpecialties: ["General Dentistry", "Cosmetic Dentistry"],
    
    allServices: [
      "Routine Cleanings", "Dental Implants", "Teeth Whitening", 
      "Veneers", "Crown & Bridge", "Root Canal", "Oral Surgery"
    ],
    
    description: "Premier dental practice in downtown DC offering comprehensive care with state-of-the-art technology. Dr. Sarah Mitchell and her team provide personalized treatment plans focused on patient comfort and exceptional results.",
    
    photos: [
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop", 
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop", 
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"  
    ],
    
    credentials: {
      education: "Georgetown University School of Dentistry, DDS",
      certifications: ["Board Certified General Dentist", "Invisalign Certified"],
      experience: "15+ years",
      languages: ["English", "Spanish"]
    },
    
    amenities: [
      "Digital X-rays", "Sedation Available", "Emergency Hours", 
      "Wheelchair Accessible", "Parking Available", "WiFi"
    ],
    
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM", 
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 4:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    
    acceptingPatients: true,
    insuranceNetworks: ["Delta Dental", "Blue Cross", "Aetna", "Metlife"],
    
    awards: ["Top Dentist 2024", "Patient Choice Award"],
    
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face"
  },
  
  {
    id: 2,
    name: "Dr. Michael Rodriguez, DDS",
    practice: "DC Smile Studio",
    address: "1776 Pennsylvania Ave NW, Fl 2, DC 20006",
    lat: 38.8993,
    lng: -77.0403,
    phone: "(202) 555-0456",
    distance: "",
    rating: 4.8,
    reviewCount: 189,
    website: "dcsmilestudio.com",
    
    primarySpecialties: ["General Dentistry", "Periodontics"],
    
    allServices: [
      "Gum Disease Treatment", "Dental Implants", "Routine Care", 
      "Deep Cleaning", "Bone Grafting", "Crown Lengthening"
    ],
    
    description: "Specializing in comprehensive periodontal care and general dentistry. Dr. Rodriguez combines advanced techniques with a gentle approach to help patients achieve optimal oral health and beautiful smiles.",
    
    photos: [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop"
    ],
    
    credentials: {
      education: "University of Maryland School of Dentistry, DDS",
      certifications: ["Board Certified Periodontist", "Laser Therapy Certified"],
      experience: "12+ years",
      languages: ["English", "Spanish", "Portuguese"]
    },
    
    amenities: [
      "Laser Therapy", "Digital Imaging", "Sedation Options", 
      "Same Day Appointments", "Parking Validated"
    ],
    

    hours: {
      monday: "7:00 AM - 5:00 PM",
      tuesday: "7:00 AM - 5:00 PM",
      wednesday: "7:00 AM - 5:00 PM", 
      thursday: "7:00 AM - 5:00 PM",
      friday: "7:00 AM - 3:00 PM",
      saturday: "8:00 AM - 1:00 PM",
      sunday: "Closed"
    },
    
    acceptingPatients: true,
    insuranceNetworks: ["Delta Dental", "Cigna", "UnitedHealthcare"],
    
    awards: ["Excellence in Perio 2023"],
    
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face"
  },
  
  {
    id: 3,
    name: "Dr. Jennifer Park, DDS",
    practice: "Georgetown Orthodontics",
    address: "3301 M St NW, Ste 200, DC 20007",
    lat: 38.9051,
    lng: -77.0637,
    phone: "(202) 555-0789",
    distance: "",
    rating: 4.7,
    reviewCount: 312,
    website: "georgetownortho.com",
    
    primarySpecialties: ["Orthodontics", "Pediatric Dentistry"],
    
    allServices: [
      "Invisalign", "Traditional Braces", "Clear Braces", 
      "Retainers", "Children's Orthodontics", "Adult Treatment"
    ],
    
    description: "Leading orthodontic practice serving families in Georgetown and surrounding areas. Dr. Park specializes in creating beautiful smiles for patients of all ages using the latest orthodontic technology and techniques.",
    
    photos: [
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop"
    ],
    
    credentials: {
      education: "Harvard School of Dental Medicine, DMD; Georgetown University Orthodontic Residency",
      certifications: ["Board Certified Orthodontist", "Invisalign Diamond Provider"],
      experience: "18+ years",
      languages: ["English", "Korean", "Mandarin"]
    },
    
    amenities: [
      "3D Imaging", "Digital Treatment Planning", "Comfortable Seating", 
      "Kid-Friendly Environment", "Flexible Payment Plans", "Video Games"
    ],
    

    hours: {
      monday: "8:00 AM - 5:30 PM",
      tuesday: "8:00 AM - 5:30 PM",
      wednesday: "8:00 AM - 5:30 PM",
      thursday: "8:00 AM - 5:30 PM", 
      friday: "8:00 AM - 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    
    acceptingPatients: false,
    insuranceNetworks: ["Blue Cross", "Aetna", "Guardian", "Delta Dental"],
    
    awards: ["Top Orthodontist DC 2024", "Best of Georgetown 2023"],
    
    image: "https://images.unsplash.com/photo-1594824371938-0c96897b8e3e?w=80&h=80&fit=crop&crop=face"
  },
  
  {
    id: 4,
    name: "Dr. David Thompson, DDS",
    practice: "Dupont Circle Dental",
    address: "1629 K St NW, Ste 300, DC 20006",
    lat: 38.9017,
    lng: -77.0367,
    phone: "(202) 555-0321",
    distance: "",
    rating: 4.6,
    reviewCount: 156,
    website: "dupontcircledental.com",
    
    primarySpecialties: ["General Dentistry", "Oral Surgery"],
    
    allServices: [
      "Wisdom Teeth Removal", "Dental Implants", "Tooth Extraction", 
      "Routine Cleanings", "Emergency Care", "Bone Grafting"
    ],
    
    description: "Comprehensive dental care with a focus on oral surgery and general dentistry. Dr. Thompson provides expert surgical procedures and routine care in a modern, comfortable environment near Dupont Circle.",
    
    photos: [
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop"
    ],
    
    credentials: {
      education: "Howard University College of Dentistry, DDS; Oral Surgery Residency",
      certifications: ["Board Certified Oral Surgeon", "IV Sedation Certified"],
      experience: "20+ years",
      languages: ["English"]
    },
    
    amenities: [
      "IV Sedation", "Nitrous Oxide", "Digital X-rays", 
      "Same Day Surgery", "Metro Accessible", "Late Hours"
    ],
    

    
    hours: {
      monday: "7:30 AM - 6:00 PM",
      tuesday: "7:30 AM - 6:00 PM",
      wednesday: "7:30 AM - 6:00 PM",
      thursday: "7:30 AM - 6:00 PM",
      friday: "7:30 AM - 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    
    acceptingPatients: true,
    insuranceNetworks: ["Delta Dental", "Metlife", "Humana"],
    
    awards: ["Surgical Excellence Award 2023"],
    
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&h=80&fit=crop&crop=face"
  },
  
  {
    id: 5,
    name: "Dr. Lisa Zhang, DDS",
    practice: "Center City Dental",
    address: "1500 Walnut St, Ste 200, Philadelphia, PA 19102",
    lat: 39.9496,
    lng: -75.1670,
    phone: "(215) 555-0654",
    distance: "",
    rating: 4.5,
    reviewCount: 203,
    website: "centercitydental.com",
    
    primarySpecialties: ["Cosmetic Dentistry", "General Dentistry"],
    
    allServices: [
      "Porcelain Veneers", "Teeth Whitening", "Smile Makeovers", 
      "Bonding", "Routine Care", "Emergency Treatment"
    ],
    
    description: "Award-winning cosmetic dentist dedicated to creating beautiful, healthy smiles. Dr. Zhang combines artistry with advanced dental technology to deliver stunning results in the heart of Philadelphia.",
    
    photos: [
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop"
    ],
    
    credentials: {
      education: "University of Pennsylvania School of Dental Medicine, DMD",
      certifications: ["AACD Accredited Cosmetic Dentist", "Botox Certified"],
      experience: "14+ years",
      languages: ["English", "Mandarin", "Cantonese"]
    },
    
    amenities: [
      "Digital Smile Design", "Cosmetic Consultations", "Comfort Menu", 
      "Valet Parking", "Concierge Service", "Spa-Like Environment"
    ],
    

    
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "9:00 AM - 3:00 PM",
      sunday: "Closed"
    },
    
    acceptingPatients: true,
    insuranceNetworks: ["Cigna", "UnitedHealthcare", "Guardian", "Delta Dental"],
    
    awards: ["Best Cosmetic Dentist Philadelphia 2024", "AACD Excellence Award"],
    
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face"
  },
  
  {
    id: 6,
    name: "Dr. Robert Kim, DDS",
    practice: "Liberty Bell Dental Group",
    address: "230 S Broad St, Ste 500, Philadelphia, PA 19102",
    lat: 39.9496,
    lng: -75.1638,
    phone: "(215) 555-0987",
    distance: "",
    rating: 4.4,
    reviewCount: 127,
    website: "libertybelldentalgroup.com",
    
    primarySpecialties: ["General Dentistry", "Implant Dentistry"],
    
    allServices: [
      "Dental Implants", "All-on-4", "Bone Grafting", 
      "Routine Cleanings", "Crowns & Bridges", "Extractions"
    ],
    
    description: "Comprehensive dental practice specializing in implant dentistry and full-mouth reconstruction. Dr. Kim helps patients restore their smiles with cutting-edge implant technology and personalized care.",
    
    photos: [
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop"
    ],
    
    credentials: {
      education: "Temple University School of Dentistry, DMD; Implant Fellowship",
      certifications: ["Board Certified Implant Specialist", "Oral Conscious Sedation"],
      experience: "16+ years",
      languages: ["English", "Korean"]
    },
    
    amenities: [
      "3D CT Imaging", "Guided Surgery", "Sedation Options", 
      "On-Site Lab", "Payment Plans", "Insurance Coordination"
    ],
    

    
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    
    acceptingPatients: true,
    insuranceNetworks: ["Blue Cross", "Aetna", "Metlife", "Humana", "Delta Dental"],
    
    awards: ["Implant Excellence 2024"],
    
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=80&h=80&fit=crop&crop=face"
  },
  
  
  {
    id: 7,
    name: "Dr. James Wilson, DDS",
    practice: "Philly Periodontics",
    address: "2000 Hamilton St, Ste 100, Philadelphia, PA 19130",
    lat: 39.9619,
    lng: -75.1731,
    phone: "(215) 555-0890",
    distance: "",
    rating: 4.2,
    reviewCount: 78,
    website: "phillyperio.com",
    
    primarySpecialties: ["Periodontics", "Oral Surgery"],
    
    allServices: [
      "Gum Disease Treatment", "Gum Grafting", "Laser Therapy", 
      "Dental Implants", "Crown Lengthening", "Pocket Reduction"
    ],
    
    description: "Board-certified periodontist specializing in advanced gum disease treatment and dental implants. Dr. Wilson uses the latest laser technology and minimally invasive techniques for optimal patient comfort.",
    
    photos: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop"
    ],
    
    credentials: {
      education: "Jefferson Medical College, DMD; Periodontics Residency",
      certifications: ["Board Certified Periodontist", "Laser Certified"],
      experience: "22+ years",
      languages: ["English"]
    },
    
    amenities: [
      "Laser Therapy", "Microscopic Surgery", "Sedation Available", 
      "Referral Coordination", "Specialist Care"
    ],
    

    
    hours: {
      monday: "8:00 AM - 4:00 PM",
      tuesday: "8:00 AM - 4:00 PM",
      wednesday: "8:00 AM - 4:00 PM",
      thursday: "8:00 AM - 4:00 PM",
      friday: "8:00 AM - 2:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    
    acceptingPatients: true,
    insuranceNetworks: ["Cigna", "Guardian", "Humana"],
    
    awards: ["Periodontal Excellence 2023"],
    
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face"
  }
];