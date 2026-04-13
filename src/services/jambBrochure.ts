// -----------------------------
// TYPES
// -----------------------------

export type Course = {
  institutionsOffering: string[];

  oLevelRequirements: {
    minimumCredits: string[];
    totalCredits: number;
  };

  jambSubjectCombination: string[];

  directEntry: {
    requirements: string[];
  };

  specialWaiverRemarks: Record<string, string>;

  careerOpportunities: string[];
};

export type CoursesDatabase = {
  status: string;
  data: Record<string, Course>;
};


// -----------------------------
// FAKE DATABASE
// -----------------------------

export const coursesBrochure: CoursesDatabase = {
  status: "success",

  data: {

    "Computer Science": {
      institutionsOffering: [
        "University of Lagos (UNILAG)",
        "University of Ibadan (UI)",
        "Federal University of Technology Owerri (FUTO)",
        "Ahmadu Bello University (ABU)",
        "University of Nigeria Nsukka (UNN)",
        "University of Benin (UNIBEN)"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English Language",
          "Mathematics",
          "Physics",
          "Chemistry or Biology"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "Use of English",
        "Mathematics",
        "Physics",
        "One of Chemistry, Biology, Economics or Geography"
      ],

      directEntry: {
        requirements: [
          "Two A-Level passes in Mathematics and Physics",
          "ND/HND upper credit in Computer Science or related field",
          "NCE merit in Mathematics and Physics"
        ]
      },

      specialWaiverRemarks: {
        UNILAG: "Accepts Biology as fourth UTME subject.",
        UNN: "Does not accept Agricultural Science.",
        FUTO: "May consider ND/HND upper credit.",
        ABU: "Further Mathematics accepted."
      },

      careerOpportunities: [
        "Software Developer",
        "Data Analyst",
        "Network Engineer",
        "Cyber Security Specialist"
      ]
    },



    "Mechanical Engineering": {

      institutionsOffering: [
        "University of Lagos (UNILAG)",
        "Federal University of Technology Akure (FUTA)",
        "University of Port Harcourt (UNIPORT)",
        "Covenant University",
        "University of Ilorin (UNILORIN)"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English Language",
          "Mathematics",
          "Physics",
          "Chemistry"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "Use of English",
        "Mathematics",
        "Physics",
        "Chemistry"
      ],

      directEntry: {
        requirements: [
          "Two A-Level passes in Mathematics and Physics",
          "ND upper credit in Engineering related field"
        ]
      },

      specialWaiverRemarks: {
        FUTA: "Accepts ND upper credit in Mechanical Engineering.",
        UNILORIN: "Further Mathematics may be accepted."
      },

      careerOpportunities: [
        "Mechanical Engineer",
        "Design Engineer",
        "Production Manager"
      ]
    },



    "Nursing": {

      institutionsOffering: [
        "University of Ibadan (UI)",
        "Ahmadu Bello University (ABU)",
        "University of Lagos (UNILAG)",
        "University of Nigeria Nsukka (UNN)"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English Language",
          "Biology",
          "Chemistry",
          "Physics"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "Use of English",
        "Biology",
        "Chemistry",
        "Physics"
      ],

      directEntry: {
        requirements: [
          "Two A-Level passes in Biology and Chemistry",
          "NCE merit in science subjects"
        ]
      },

      specialWaiverRemarks: {
        UI: "Highly competitive course.",
        UNN: "ND upper credit may be considered."
      },

      careerOpportunities: [
        "Registered Nurse",
        "Public Health Nurse",
        "Clinical Nurse Specialist"
      ]
    },

    "Accounting": {

      institutionsOffering: [
        "UNILAG",
        "UI",
        "UNIBEN",
        "UNN"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English",
          "Mathematics",
          "Economics"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "Use of English",
        "Mathematics",
        "Economics",
        "Commerce or Accounting"
      ],

      directEntry: {
        requirements: [
          "A-Level Economics",
          "ND/HND Accounting"
        ]
      },

      specialWaiverRemarks: {},

      careerOpportunities: [
        "Accountant",
        "Auditor",
        "Tax Consultant"
      ]
    },


    // ======================
    // ECONOMICS
    // ======================

    "Economics": {

      institutionsOffering: [
        "UI",
        "UNILAG",
        "UNN",
        "ABU"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English",
          "Mathematics",
          "Economics"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "Use of English",
        "Mathematics",
        "Economics",
        "Government or Geography"
      ],

      directEntry: {
        requirements: [
          "A-Level Economics"
        ]
      },

      specialWaiverRemarks: {},

      careerOpportunities: [
        "Economist",
        "Financial Analyst",
        "Policy Analyst"
      ]
    },


    // ======================
    // BUSINESS ADMINISTRATION
    // ======================

    "Business Administration": {

      institutionsOffering: [
        "UNILAG",
        "UNIBEN",
        "UNN"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English",
          "Mathematics",
          "Economics"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "English",
        "Mathematics",
        "Economics",
        "Commerce"
      ],

      directEntry: {
        requirements: [
          "ND/HND Business Admin"
        ]
      },

      specialWaiverRemarks: {},

      careerOpportunities: [
        "Business Manager",
        "Entrepreneur",
        "HR Manager"
      ]
    },


    // ======================
    // MEDICINE
    // ======================

    "Medicine and Surgery": {

      institutionsOffering: [
        "UI",
        "UNILAG",
        "UNN"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English",
          "Biology",
          "Chemistry",
          "Physics"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "English",
        "Biology",
        "Chemistry",
        "Physics"
      ],

      directEntry: {
        requirements: [
          "A-Level Biology and Chemistry"
        ]
      },

      specialWaiverRemarks: {},

      careerOpportunities: [
        "Doctor",
        "Surgeon",
        "Medical Consultant"
      ]
    },


    // ======================
    // LAW
    // ======================

    "Law": {

      institutionsOffering: [
        "UI",
        "UNILAG",
        "UNN"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English",
          "Literature"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "English",
        "Literature",
        "Government",
        "CRS or IRS"
      ],

      directEntry: {
        requirements: [
          "A-Level Literature"
        ]
      },

      specialWaiverRemarks: {},

      careerOpportunities: [
        "Lawyer",
        "Judge",
        "Legal Adviser"
      ]
    },


    // ======================
    // MASS COMMUNICATION
    // ======================

    "Mass Communication": {

      institutionsOffering: [
        "UNILAG",
        "UNN",
        "UNIBEN"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English",
          "Literature"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "English",
        "Literature",
        "Government",
        "CRS or IRS"
      ],

      directEntry: {
        requirements: [
          "ND Mass Communication"
        ]
      },

      specialWaiverRemarks: {},

      careerOpportunities: [
        "Journalist",
        "Broadcaster",
        "Media Consultant"
      ]
    },


    // ======================
    // BIOCHEMISTRY
    // ======================

    "Biochemistry": {

      institutionsOffering: [
        "UNILAG",
        "UNN",
        "UI"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English",
          "Biology",
          "Chemistry",
          "Physics"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "English",
        "Biology",
        "Chemistry",
        "Physics"
      ],

      directEntry: {
        requirements: [
          "A-Level Chemistry and Biology"
        ]
      },

      specialWaiverRemarks: {},

      careerOpportunities: [
        "Biochemist",
        "Lab Scientist"
      ]
    },


    // ======================
    // POLITICAL SCIENCE
    // ======================

    "Political Science": {

      institutionsOffering: [
        "UI",
        "UNILAG",
        "ABU"
      ],

      oLevelRequirements: {
        minimumCredits: [
          "English",
          "Government"
        ],
        totalCredits: 5
      },

      jambSubjectCombination: [
        "English",
        "Government",
        "Economics",
        "Literature"
      ],

      directEntry: {
        requirements: [
          "A-Level Government"
        ]
      },

      specialWaiverRemarks: {},

      careerOpportunities: [
        "Politician",
        "Policy Analyst"
      ]
    },

    "Electrical Engineering": {

  institutionsOffering: [
    "UNILAG",
    "FUTA",
    "UNIBEN",
    "UNN"
  ],

  oLevelRequirements: {
    minimumCredits: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry"
    ],
    totalCredits: 5
  },

  jambSubjectCombination: [
    "English",
    "Mathematics",
    "Physics",
    "Chemistry"
  ],

  directEntry: {
    requirements: [
      "A-Level Mathematics and Physics",
      "ND Electrical Engineering"
    ]
  },

  specialWaiverRemarks: {},

  careerOpportunities: [
    "Electrical Engineer",
    "Power Engineer",
    "Telecom Engineer"
  ]
},


"Civil Engineering": {

  institutionsOffering: [
    "UNILAG",
    "UNIBEN",
    "FUTA",
    "UNN"
  ],

  oLevelRequirements: {
    minimumCredits: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry"
    ],
    totalCredits: 5
  },

  jambSubjectCombination: [
    "English",
    "Mathematics",
    "Physics",
    "Chemistry"
  ],

  directEntry: {
    requirements: [
      "ND Civil Engineering"
    ]
  },

  specialWaiverRemarks: {},

  careerOpportunities: [
    "Civil Engineer",
    "Construction Engineer"
  ]
},


"Chemical Engineering": {

  institutionsOffering: [
    "UNILAG",
    "UNIBEN",
    "UI"
  ],

  oLevelRequirements: {
    minimumCredits: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry"
    ],
    totalCredits: 5
  },

  jambSubjectCombination: [
    "English",
    "Mathematics",
    "Physics",
    "Chemistry"
  ],

  directEntry: {
    requirements: [
      "ND Chemical Engineering"
    ]
  },

  specialWaiverRemarks: {},

  careerOpportunities: [
    "Chemical Engineer",
    "Plant Engineer"
  ]
},

"Physics": {

  institutionsOffering: [
    "UI",
    "UNILAG",
    "UNN"
  ],

  oLevelRequirements: {
    minimumCredits: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry"
    ],
    totalCredits: 5
  },

  jambSubjectCombination: [
    "English",
    "Mathematics",
    "Physics",
    "Chemistry"
  ],

  directEntry: {
    requirements: [
      "A-Level Physics"
    ]
  },

  specialWaiverRemarks: {},

  careerOpportunities: [
    "Physicist",
    "Research Scientist"
  ]
},


"Chemistry": {

  institutionsOffering: [
    "UI",
    "UNILAG",
    "UNN"
  ],

  oLevelRequirements: {
    minimumCredits: [
      "English",
      "Mathematics",
      "Chemistry"
    ],
    totalCredits: 5
  },

  jambSubjectCombination: [
    "English",
    "Chemistry",
    "Physics",
    "Mathematics"
  ],

  directEntry: {
    requirements: [
      "A-Level Chemistry"
    ]
  },

  specialWaiverRemarks: {},

  careerOpportunities: [
    "Chemist",
    "Lab Scientist"
  ]
},


"Mathematics": {

  institutionsOffering: [
    "UI",
    "UNILAG",
    "UNN"
  ],

  oLevelRequirements: {
    minimumCredits: [
      "English",
      "Mathematics"
    ],
    totalCredits: 5
  },

  jambSubjectCombination: [
    "English",
    "Mathematics",
    "Physics",
    "Economics"
  ],

  directEntry: {
    requirements: [
      "A-Level Mathematics"
    ]
  },

  specialWaiverRemarks: {},

  careerOpportunities: [
    "Statistician",
    "Data Scientist"
  ]
},


"Statistics": {

  institutionsOffering: [
    "UNILAG",
    "UI",
    "UNN"
  ],

  oLevelRequirements: {
    minimumCredits: [
      "English",
      "Mathematics"
    ],
    totalCredits: 5
  },

  jambSubjectCombination: [
    "English",
    "Mathematics",
    "Economics",
    "Physics"
  ],

  directEntry: {
    requirements: [
      "ND Statistics"
    ]
  },

  specialWaiverRemarks: {},

  careerOpportunities: [
    "Statistician",
    "Data Analyst"
  ]
},

  }

  

  

};


// -----------------------------
// FAKE API FUNCTION
// -----------------------------

export const getCourseInfo = async (
  courseName: string
): Promise<Course> => {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      const course = coursesBrochure.data[courseName];

      if (course) {
        resolve(course);
      } else {
        reject(new Error("Course not found"));
      }

    }, 1000);

  });

};