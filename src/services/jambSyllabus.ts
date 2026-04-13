// -----------------------------
// TYPES
// -----------------------------

export interface Topic {
  chapter: string;
  objectives: string[];
  subtopics: string[];
}

export interface JambSyllabus {
  subject: string;
  general_objective: string;
  course_objectives: string[];
  topics: Topic[];
   recommended_texts?: string[];
}

// -----------------------------
// FAKE DATABASE
// -----------------------------

const jambDatabase: JambSyllabus[] = [
  {
    subject: "Economics",
    general_objective:
      "The aim of the Unified Tertiary Matriculation Examination (UTME) 2026 syllabus in Economics is to prepare the candidate for the board's examination. It is designed to test their achievement of the course objectives, which are to:",
    course_objectives: [
      "Demonstrate sufficient knowledge and understanding of basic economic concepts and tools.",
      "Describe major economic activities: production, distribution and consumption.",
      "Apply economic principles to real-life situations.",
      "Analyze economic problems at both national and international levels.",
      "Interpret economic data using tables, charts and graphs.",
      "Understand the structure of the Nigerian economy and global economic relationships."
    ],
    topics: [
      {
        chapter: "Economics as a Science",
        objectives: [
          "Define Economics and explain its scope.",
          "Explain basic concepts such as wants, scarcity, choice and opportunity cost.",
          "Apply Production Possibility Frontier (PPF) to economic problems."
        ],
        subtopics: ["Basic concepts", "Economic problems", "Production Possibility Frontier (PPF)"]
      },
      {
        chapter: "Economic Systems",
        objectives: [
          "Identify types of economic systems.",
          "Compare features of free enterprise, planned and mixed economies.",
          "Explain how economic systems solve economic problems."
        ],
        subtopics: ["Free enterprise economy", "Centrally planned economy", "Mixed economy", "Contemporary issues"]
      },
      {
        chapter: "Methods & Tools of Economic Analysis",
        objectives: [
          "Differentiate between positive and normative economics.",
          "Use tables, graphs and charts in analysis.",
          "Calculate mean, median, mode and standard deviation."
        ],
        subtopics: ["Scientific methods", "Graphs and charts", "Measures of average", "Measures of dispersion"]
      },
      {
        chapter: "Theory of Demand",
        objectives: [
          "State and explain the law of demand.",
          "Identify determinants of demand.",
          "Calculate and interpret elasticity of demand."
        ],
        subtopics: ["Law of demand", "Determinants of demand", "Elasticity of demand", "Consumer surplus"]
      },
      {
        chapter: "Theory of Consumer Behaviour",
        objectives: [
          "Explain utility concepts.",
          "Differentiate between total and marginal utility.",
          "Analyze consumer equilibrium."
        ],
        subtopics: ["Utility theory", "Indifference curves", "Consumer equilibrium"]
      },
      {
        chapter: "Theory of Supply",
        objectives: [
          "State and explain the law of supply.",
          "Identify determinants of supply.",
          "Calculate elasticity of supply."
        ],
        subtopics: ["Law of supply", "Determinants of supply", "Elasticity of supply"]
      },
      {
        chapter: "Theory of Price Determination",
        objectives: [
          "Explain market equilibrium.",
          "Analyze effects of changes in demand and supply.",
          "Interpret price control policies."
        ],
        subtopics: ["Market equilibrium", "Price mechanism", "Price control"]
      },
      {
        chapter: "Theory of Production",
        objectives: [
          "Explain production function.",
          "Differentiate between short-run and long-run production.",
          "Apply law of diminishing returns."
        ],
        subtopics: ["Production function", "Short-run production", "Long-run production", "Law of diminishing returns"]
      },
      {
        chapter: "Theory of Costs and Revenue",
        objectives: [
          "Differentiate between types of costs.",
          "Explain revenue concepts.",
          "Calculate profit."
        ],
        subtopics: ["Cost concepts", "Revenue concepts", "Profit maximization"]
      },
      {
        chapter: "Market Structures",
        objectives: [
          "Identify different market structures.",
          "Compare perfect competition and monopoly.",
          "Explain price determination under each market structure."
        ],
        subtopics: ["Perfect competition", "Monopoly", "Monopolistic competition", "Oligopoly"]
      },
      {
        chapter: "National Income",
        objectives: [
          "Define national income.",
          "Explain methods of measuring national income.",
          "Identify limitations of national income measurement."
        ],
        subtopics: ["GDP and GNP", "Methods of measurement", "Limitations"]
      },
      {
        chapter: "Money, Banking and Inflation",
        objectives: [
          "Explain functions of money.",
          "Describe roles of central and commercial banks.",
          "Analyze causes and effects of inflation."
        ],
        subtopics: ["Functions of money", "Central banking", "Commercial banking", "Inflation"]
      },
      {
        chapter: "Financial Institutions",
        objectives: [
          "Identify types of financial institutions.",
          "Explain their roles in economic development."
        ],
        subtopics: ["Banking institutions", "Non-bank financial institutions"]
      },
      {
        chapter: "Public Finance",
        objectives: [
          "Explain government revenue sources.",
          "Describe taxation principles.",
          "Analyze government expenditure."
        ],
        subtopics: ["Government revenue", "Taxation", "Public expenditure", "Budget"]
      },
      {
        chapter: "Economic Growth & Development",
        objectives: [
          "Differentiate between growth and development.",
          "Identify indicators of development.",
          "Explain factors affecting development."
        ],
        subtopics: ["Economic growth", "Economic development", "Development indicators"]
      },
      {
        chapter: "Agriculture in Nigeria",
        objectives: [
          "Explain importance of agriculture.",
          "Identify problems facing agriculture.",
          "Suggest solutions."
        ],
        subtopics: ["Agricultural contribution", "Agricultural policies", "Problems of agriculture"]
      },
      {
        chapter: "Industry and Industrialization",
        objectives: [
          "Explain industrialization.",
          "Identify types of industries.",
          "Analyze industrial policies."
        ],
        subtopics: ["Types of industries", "Industrial policies", "Problems of industrialization"]
      },
      {
        chapter: "Natural Resources and the Nigerian Economy",
        objectives: [
          "Identify major natural resources.",
          "Explain their contribution to the economy."
        ],
        subtopics: ["Types of natural resources", "Resource management"]
      },
      {
        chapter: "Business Organisations",
        objectives: [
          "Identify forms of business organization.",
          "Compare their advantages and disadvantages."
        ],
        subtopics: ["Sole proprietorship", "Partnership", "Limited liability company", "Cooperative society"]
      },
      {
        chapter: "Population Economics",
        objectives: [
          "Explain population concepts.",
          "Analyze effects of population on development."
        ],
        subtopics: ["Population growth", "Population policies", "Demographic transition"]
      },
      {
        chapter: "International Trade",
        objectives: [
          "Explain reasons for international trade.",
          "Differentiate between balance of trade and balance of payments.",
          "Explain trade restrictions."
        ],
        subtopics: ["Reasons for trade", "Balance of payments", "Trade barriers"]
      },
      {
        chapter: "International Economic Organisations",
        objectives: [
          "Identify major international economic organizations.",
          "Explain their roles in global trade."
        ],
        subtopics: ["ECOWAS", "OPEC", "IMF", "WTO"]
      },
      {
        chapter: "Factors of Production",
        objectives: [
          "Identify the four factors of production.",
          "Explain their characteristics and rewards."
        ],
        subtopics: ["Land", "Labour", "Capital", "Entrepreneurship"]
      }
    ]
  },

  {
  "subject": "Mathematics",
  "general_objective": "The aim of the UTME 2026 Mathematics syllabus is to prepare candidates to understand and apply mathematical concepts and techniques to solve problems and reason logically.",
  "course_objectives": [
    "Acquire computational and manipulative skills.",
    "Develop logical and formal reasoning skills.",
    "Interpret and analyze data presented in various forms.",
    "Apply mathematical concepts to solve real‑life problems.",
    "Understand and solve problems involving calculus, geometry, algebra and statistics."
  ],
  "topics": [
    {
      "chapter": "Number and Numeration",
      "objectives": [
        "Perform operations in different number bases.",
        "Convert numbers between bases.",
        "Solve problems on fractions, decimals, percentages.",
        "Apply ratio, proportion, simple interest and profit & loss calculations."
      ],
      "subtopics": [
        "Number bases and conversions",
        "Fractions, decimals and approximations",
        "Percentages and percentage errors",
        "Ratio, proportion and rate",
        "Simple interest and profit & loss"
      ]
    },
    {
      "chapter": "Indices, Logarithms and Surds",
      "objectives": [
        "Use laws of indices and standard form.",
        "Apply laws of logarithms and change of base.",
        "Simplify and rationalize surds."
      ],
      "subtopics": [
        "Laws of indices",
        "Standard form",
        "Laws of logarithms",
        "Change of base",
        "Surds simplification"
      ]
    },
    {
      "chapter": "Sets and Venn Diagrams",
      "objectives": [
        "Define and classify different types of sets.",
        "Use set notation and operations.",
        "Solve problems using Venn diagrams."
      ],
      "subtopics": [
        "Types of sets",
        "Set operations",
        "Venn diagrams"
      ]
    },
    {
      "chapter": "Algebra",
      "objectives": [
        "Manipulate polynomials and solve equations.",
        "Solve variation, inequalities and sequences.",
        "Understand binary operations and matrices.",
        "Solve systems of equations."
      ],
      "subtopics": [
        "Polynomials and factorization",
        "Simultaneous equations",
        "Variation (direct, inverse, joint)",
        "Inequalities (linear & quadratic)",
        "Progressions (AP & GP)",
        "Binary operations",
        "Matrices and determinants"
      ]
    },
    {
      "chapter": "Geometry and Trigonometry",
      "objectives": [
        "Understand geometry of shapes and lines.",
        "Solve problems on mensuration.",
        "Apply coordinate geometry and trigonometry."
      ],
      "subtopics": [
        "Euclidean geometry",
        "Mensuration (plane & solid figures)",
        "Coordinate geometry",
        "Trigonometric ratios and identities",
        "Bearings, elevations and depressions"
      ]
    },
    {
      "chapter": "Calculus",
      "objectives": [
        "Understand limits and differentiation.",
        "Apply differentiation to solve maxima/minima problems.",
        "Understand basic integration."
      ],
      "subtopics": [
        "Limits of functions",
        "Differentiation rules",
        "Applications of differentiation",
        "Basic integration"
      ]
    },
    {
      "chapter": "Statistics and Probability",
      "objectives": [
        "Interpret statistical data.",
        "Compute mean, median, mode and dispersion measures.",
        "Solve probability problems."
      ],
      "subtopics": [
        "Data representation (tables, charts)",
        "Measures of central tendency",
        "Range, variance and standard deviation",
        "Probability and counting principles"
      ]
    }
  ]
},

{
  "subject": "English",
  "general_objective": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2026 syllabus in Use of English is to guide candidates in their preparation for the Board’s examination. It is designed to evaluate the candidates’ ability to communicate effectively in both written and spoken English and to use English Language for learning at the tertiary level.",

  "course_objectives": [
    "Develop strong reading comprehension skills.",
    "Understand and apply correct grammar and sentence structure.",
    "Use standard English vocabulary in context.",
    "Interpret and use spoken and written forms of English.",
    "Summarize ideas and synthesize information from texts."
  ],

  "topics": [
    {
      "chapter": "Comprehension and Summary",
      "objectives": [
        "Identify main ideas and implied meanings in passages.",
        "Interpret words, phrases, idioms, and figures of speech.",
        "Make inferences and logical deductions from text.",
        "Summarize ideas from passages clearly and coherently."
      ],
      "subtopics": [
        "Reading comprehension (description, narration, exposition, argumentation)",
        "Cloze test",
        "Inference and deduction",
        "Summary and synthesis of ideas",
        "Approved reading text (e.g., *The LifeChanger* by Khadija Abubakar Jalli)"
      ]
    },
    {
      "chapter": "Lexis and Structure",
      "objectives": [
        "Use and distinguish between different word classes and their functions.",
        "Apply grammar rules to identify correct structure in context.",
        "Understand and use vocabulary in context.",
        "Recognize and correct errors in written English."
      ],
      "subtopics": [
        "Parts of speech",
        "Tenses and verb forms",
        "Sentence structure and types",
        "Vocabulary usage",
        "Idioms and phrasal expressions",
        "Error identification and correction"
      ]
    },
    {
      "chapter": "Oral and Written Expression",
      "objectives": [
        "Understand elements of spoken English (stress and pronunciation).",
        "Interpret connected speech patterns.",
        "Write clear and coherent sentences and short compositions.",
        "Demonstrate knowledge of spoken English conventions."
      ],
      "subtopics": [
        "Pronunciation and phonetics",
        "Stress and intonation patterns",
        "Connected speech features",
        "Short writing tasks (e.g., letters, dialogues)"
      ]
    }
  ]
},
{
  "subject": "Physics",
  "general_objective": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2026 syllabus in Physics is to prepare candidates to understand, analyse and apply physical laws, principles and problem-solving skills to both theoretical and practical situations.",
  "course_objectives": [
    "Sustain interest in physics.",
    "Develop attitude relevant to physics that encourages accuracy, precision and objectivity.",
    "Interpret physical phenomena, laws, definitions, concepts and other theories.",
    "Demonstrate ability to solve physics problems using relevant theories and concepts."
  ],
  "topics": [
    {
      "chapter": "Measurements and Units",
      "objectives": [
        "Identify units of length, area and volume and use measuring instruments.",
        "Determine lengths, areas and volumes of regular and irregular bodies.",
        "Identify units of mass and time and use relevant measuring devices.",
        "Relate fundamental physical quantities to their units and deduce units of derived quantities.",
        "Determine dimensions and use homogeneity of equations.",
        "Assess accuracy of measuring instruments and estimate errors."
      ],
      "subtopics": [
        "Length, area and volume",
        "Mass and beam balance",
        "Time and time-measuring devices",
        "Fundamental and derived quantities",
        "Dimensions",
        "Accuracy, errors, and significant figures",
        "Position, distance and displacement"
      ]
    },
    {
      "chapter": "Scalars and Vectors",
      "objectives": [
        "Distinguish between scalar and vector quantities.",
        "Determine resultant of vectors and relative velocity.",
        "Resolve vectors into components and use graphical methods to solve vector problems."
      ],
      "subtopics": [
        "Definition of scalar and vector quantities",
        "Examples of scalars and vectors",
        "Relative velocity",
        "Resolution of vectors"
      ]
    },
    {
      "chapter": "Motion",
      "objectives": [
        "Identify types of motion.",
        "Solve numerical problems on linear motion and uniformly accelerated motion.",
        "Apply Newton’s laws and impulse-momentum principle.",
        "Analyse motion in a circle and simple harmonic motion.",
        "Interpret graphs and energy changes in S.H.M."
      ],
      "subtopics": [
        "Types of motion (translational, oscillatory, rotational, spin, random)",
        "Relative motion",
        "Linear motion and projectile motion",
        "Newton’s laws of motion",
        "Impulse and momentum",
        "Motion in a circle",
        "Simple Harmonic Motion (S.H.M)"
      ]
    },
    {
      "chapter": "Gravitation",
      "objectives": [
        "Understand Newton’s law of gravitation.",
        "Calculate gravitational fields and potentials.",
        "Solve problems involving acceleration due to gravity and escape velocity."
      ],
      "subtopics": [
        "Universal gravitation",
        "Gravitational field",
        "Weight vs mass",
        "Escape velocity"
      ]
    },
    {
      "chapter": "Forces, Energy and Power",
      "objectives": [
        "Explain work, energy, and power.",
        "Apply conservation of energy.",
        "Solve numerical problems on energy transformations."
      ],
      "subtopics": [
        "Work and energy",
        "Power",
        "Conservation of energy"
      ]
    },
    {
      "chapter": "Properties of Matter",
      "objectives": [
        "Understand elasticity, pressure and viscosity.",
        "Apply Archimedes’ principle and analyze fluid pressure."
      ],
      "subtopics": [
        "Elasticity (Hooke’s law, Young’s modulus)",
        "Pressure in fluids",
        "Viscosity and terminal velocity",
        "Archimedes’ principle"
      ]
    },
    {
      "chapter": "Thermal Physics",
      "objectives": [
        "Understand temperature and heat transfer.",
        "Apply gas laws and analyze thermal expansion.",
        "Describe vapours, phase changes and kinetic theory."
      ],
      "subtopics": [
        "Temperature and thermometers",
        "Thermal expansion",
        "Gas laws",
        "Vapours and humidity",
        "Kinetic theory of gases"
      ]
    },
    {
      "chapter": "Waves, Sound and Light",
      "objectives": [
        "Describe wave motion and properties.",
        "Apply principles of sound and light, including reflection, refraction and dispersion.",
        "Solve related numerical problems."
      ],
      "subtopics": [
        "Wave motion",
        "Sound waves",
        "Reflection and refraction of light",
        "Dispersion and colours"
      ]
    },
    {
      "chapter": "Electricity and Magnetism",
      "objectives": [
        "Understand electrostatics and current electricity.",
        "Solve numerical problems using Ohm’s law and circuits.",
        "Explain magnetism and electromagnetic induction."
      ],
      "subtopics": [
        "Electrostatics (charges, Coulomb's law, electric field)",
        "Current electricity and circuits",
        "Magnetism and magnetic fields",
        "Electromagnetic induction"
      ]
    },
    {
      "chapter": "Modern Physics",
      "objectives": [
        "Understand atomic models and photoelectric effect.",
        "Explain radioactivity and energy quantisation.",
        "Apply modern physics principles to problems."
      ],
      "subtopics": [
        "Atomic structure",
        "Photoelectric effect",
        "Radioactivity",
        "Basic quantum concepts"
      ]
    }
  ]
},
{
  "subject": "Chemistry",
  "general_objective": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2026 syllabus in Chemistry is to prepare candidates to understand, analyse and apply chemical principles, facts, laws and techniques to everyday situations and to relate chemistry to the other natural sciences. Candidates are expected to demonstrate knowledge and application of both theory and practical chemistry.",
  "course_objectives": [
    "Understand the fundamental concepts and principles of chemistry.",
    "Apply chemical laws and perform basic quantitative and qualitative analyses.",
    "Interpret and analyse chemical data and reactions.",
    "Relate chemical principles to everyday life and industrial applications.",
    "Develop problem‑solving and reasoning skills in chemical contexts."
  ],
  "topics": [
    {
      "chapter": "Separation of Mixtures & Purification",
      "objectives": [
        "Differentiate pure and impure substances.",
        "Use criteria for purity (boiling/melting points).",
        "Apply principles of separation techniques."
      ],
      "subtopics": [
        "Pure vs impure substances",
        "Boiling and melting points",
        "Elements, compounds and mixtures",
        "Separation processes: evaporation, distillation, filtration, crystallization, chromatography, decantation"
      ]
    },
    {
      "chapter": "Chemical Combination & Stoichiometry",
      "objectives": [
        "Explain chemical laws of combination.",
        "Use chemical formulae and equations.",
        "Apply the mole concept in calculations."
      ],
      "subtopics": [
        "Laws of definite and multiple proportions",
        "Law of conservation of matter",
        "Gay‑Lussac’s law",
        "Avogadro’s law and mole concept",
        "Stoichiometric calculations"
      ]
    },
    {
      "chapter": "Kinetic Theory & Gas Laws",
      "objectives": [
        "Describe kinetic theory of matter.",
        "Apply gas laws to real systems.",
        "Understand the behaviour of gases."
      ],
      "subtopics": [
        "Kinetic theory of matter",
        "Brownian movement",
        "Boyle’s law, Charles’ law, combined gas law",
        "Partial pressure and molar volume"
      ]
    },
    {
      "chapter": "Atomic Structure & Periodicity",
      "objectives": [
        "Explain atomic models and electron configurations.",
        "Apply periodicity trends.",
        "Differentiate isotopes and atomic structure concepts."
      ],
      "subtopics": [
        "Dalton, Thomson, Rutherford and Bohr models",
        "Electron configuration",
        "Mass number, atomic number and isotopes",
        "Periodic table trends"
      ]
    },
    {
      "chapter": "Chemical Bonding & Molecular Shapes",
      "objectives": [
        "Differentiate types of chemical bonds.",
        "Describe molecular shapes using VSEPR.",
        "Relate bond types to properties."
      ],
      "subtopics": [
        "Ionic, covalent and metallic bonding",
        "Hydrogen bonding",
        "Coordinate bonds and van der Waals forces",
        "Shapes of molecules (linear, tetrahedral, pyramidal)"
      ]
    },
    {
      "chapter": "Solutions & Solubility",
      "objectives": [
        "Define types of solutions.",
        "Interpret solubility curves.",
        "Calculate solubility values."
      ],
      "subtopics": [
        "Unsaturated, saturated and supersaturated solutions",
        "Solubility curves",
        "Solvents for fats, oils and paints",
        "Suspensions and colloids"
      ]
    },
    {
      "chapter": "Environmental Pollution",
      "objectives": [
        "Identify sources and effects of pollutants.",
        "Recommend control measures.",
        "Classify pollutants."
      ],
      "subtopics": [
        "Air pollution (CO, SO2, NOx etc.)",
        "Water pollution",
        "Soil pollution",
        "Biodegradable vs non‑biodegradable pollutants"
      ]
    },
    {
      "chapter": "Acids, Bases & Salts",
      "objectives": [
        "Differentiate acids, bases and salts.",
        "Apply indicators and pH concepts.",
        "Prepare and classify different salts."
      ],
      "subtopics": [
        "Properties of acids and bases",
        "Indicators and pH concept",
        "Basicity of acids",
        "Preparation of salts"
      ]
    },
    {
      "chapter": "Oxidation & Reduction",
      "objectives": [
        "Define oxidation and reduction in multiple ways.",
        "Balance redox reactions.",
        "Use oxidation numbers."
      ],
      "subtopics": [
        "Oxidation as addition of oxygen/removal of hydrogen",
        "Reduction as removal of oxygen/addition of hydrogen",
        "Electron transfer concept",
        "Oxidation numbers"
      ]
    },
    {
      "chapter": "Electrolysis & Electrochemistry",
      "objectives": [
        "Differentiate electrolytes and non‑electrolytes.",
        "Predict products of electrolysis.",
        "Describe applications of electrolysis."
      ],
      "subtopics": [
        "Electrolytes and non‑electrolytes",
        "Electrolysis of solutions",
        "Electrochemical cells",
        "Corrosion protection"
      ]
    },
    {
      "chapter": "Energy Changes & Thermochemistry",
      "objectives": [
        "Interpret heat changes in reactions.",
        "Explain spontaneity and energy concepts."
      ],
      "subtopics": [
        "Enthalpy changes (ΔH)",
        "Spontaneity and entropy",
        "Heat transfer in physical and chemical processes"
      ]
    },
    {
      "chapter": "Rates of Chemical Reactions",
      "objectives": [
        "Identify factors influencing reaction rate.",
        "Interpret rate curves and activation energy."
      ],
      "subtopics": [
        "Effect of temperature, concentration and catalysts",
        "Surface area effects",
        "Reaction rate curves",
        "Activation energy"
      ]
    },
    {
      "chapter": "Chemical Equilibrium",
      "objectives": [
        "Describe reversible reactions.",
        "Apply Le Chatelier’s principle.",
        "Predict changes in equilibrium."
      ],
      "subtopics": [
        "Dynamic equilibrium",
        "Factors shifting equilibrium",
        "Le Chatelier’s principle"
      ]
    },
    {
      "chapter": "Inorganic Chemistry – Non‑Metals & Their Compounds",
      "objectives": [
        "Describe properties and reactions of non‑metals.",
        "Explain preparation and uses of non‑metal compounds."
      ],
      "subtopics": [
        "Hydrogen and its compounds",
        "Halogens",
        "Oxygen, nitrogen and sulphur compounds"
      ]
    },
    {
      "chapter": "Inorganic Chemistry – Metals & Their Compounds",
      "objectives": [
        "Identify general properties of metals.",
        "Relate extraction and uses of metals."
      ],
      "subtopics": [
        "Alkali metals",
        "Alkaline earth metals",
        "Transition metals and alloys"
      ]
    },
    {
      "chapter": "Organic Chemistry",
      "objectives": [
        "Name and classify organic compounds.",
        "Relate functional groups to properties.",
        "Discuss polymerisation."
      ],
      "subtopics": [
        "Hydrocarbons (alkanes, alkenes, alkynes)",
        "Alcohols, acids and amines",
        "Carbohydrates and polymers"
      ]
    },
    {
      "chapter": "Chemistry and Industry",
      "objectives": [
        "Describe chemical industries and their products.",
        "Identify raw materials for industries."
      ],
      "subtopics": [
        "Types of chemical industries",
        "Raw materials and products",
        "Biotechnology in industry"
      ]
    }
  ]
},
{
  "subject": "Biology",
  "general_objective": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2026 syllabus in Biology is to prepare candidates to demonstrate sufficient knowledge of the diversity, interdependence and unity of life, account for continuity of life through inheritance and evolution, and apply biological principles to everyday life and the environment.",
  "course_objectives": [
    "Demonstrate sufficient knowledge of the concepts of diversity and unity of life.",
    "Explain inheritance, variation and evolution among organisms.",
    "Apply biological principles to health, environment and community issues.",
    "Analyse relationships within and between living organisms and their ecosystems.",
    "Develop skills for interpreting biological data and problem solving."
  ],
  "topics": [
    {
      "chapter": "Living Organisms & Cell Structure",
      "objectives": [
        "Recognise characteristics of living things.",
        "Identify structures and functions of plant and animal cells.",
        "Describe levels of biological organization."
      ],
      "subtopics": [
        "Characteristics of living organisms",
        "Cell structure and functions",
        "Levels of organization (cell, tissue, organ, organ systems, organisms)"
      ]
    },
    {
      "chapter": "Evolution & Classification",
      "objectives": [
        "Explain evolution among major groups of organisms.",
        "Classify organisms into kingdom groups.",
        "Trace evolutionary trends among organisms."
      ],
      "subtopics": [
        "Monera, Protista, Fungi",
        "Plantae (Thallophyta, Bryophyta, Pteridophyta, Spermatophyta)",
        "Animalia (invertebrates & vertebrates)"
      ]
    },
    {
      "chapter": "Adaptations of Organisms",
      "objectives": [
        "Explain structural, functional and behavioural adaptations.",
        "Analyse survival strategies of organisms."
      ],
      "subtopics": [
        "Structural adaptations",
        "Functional adaptations",
        "Behavioural adaptations",
        "Adaptive colouration"
      ]
    },
    {
      "chapter": "Plant & Animal Form and Function",
      "objectives": [
        "Describe the internal structure of flowering plants and mammals.",
        "Explain modes of nutrition and digestion.",
        "Identify transport, respiration, excretion and support systems."
      ],
      "subtopics": [
        "Internal structures (root, stem, leaf, mammal)",
        "Nutrition (autotrophic & heterotrophic)",
        "Transport in plants and animals",
        "Respiration and gaseous exchange",
        "Excretory systems",
        "Support and movement"
      ]
    },
    {
      "chapter": "Reproduction & Growth",
      "objectives": [
        "Explain asexual and sexual reproduction in plants and animals.",
        "Describe patterns and factors affecting growth."
      ],
      "subtopics": [
        "Asexual vs sexual reproduction",
        "Flowering plant reproduction",
        "Mammalian reproduction",
        "Seed germination and growth"
      ]
    },
    {
      "chapter": "Coordination & Control",
      "objectives": [
        "Understand nervous and hormonal coordination.",
        "Describe homeostasis mechanisms."
      ],
      "subtopics": [
        "Nervous system structure and function",
        "Sense organs",
        "Hormonal control",
        "Homeostasis"
      ]
    },
    {
      "chapter": "Ecology & Environment",
      "objectives": [
        "Describe ecosystem components and interactions.",
        "Explain energy flow and nutrient cycling.",
        "Analyse factors affecting populations and environment."
      ],
      "subtopics": [
        "Abiotic and biotic factors",
        "Food chains, food webs and trophic levels",
        "Nutrient cycles (carbon, nitrogen, water)",
        "Population ecology",
        "Natural habitats and Nigerian biomes",
        "Pollution and conservation"
      ]
    },
    {
      "chapter": "Soil Biology",
      "objectives": [
        "Describe soil types, structure and components.",
        "Explain factors influencing soil fertility."
      ],
      "subtopics": [
        "Types of soil (sandy, clayey, loamy)",
        "Soil composition (organic & inorganic)",
        "Soil fertility and maintenance"
      ]
    },
    {
      "chapter": "Humans & the Environment",
      "objectives": [
        "Analyse human impacts on ecosystems.",
        "Explain disease, pollution and environmental management."
      ],
      "subtopics": [
        "Human diseases and transmission",
        "Pollution types and control",
        "Sanitation and sewage management",
        "Conservation of natural resources"
      ]
    }
  ]
},
{
  "subject": "Literature in English",
  "general_objective": "The aim of the Unified Tertiary Matriculation Examination (UTME) 2026 syllabus in Literature in English is to prepare candidates for the Board’s examination by stimulating interest in literary study, developing analytical skills, and appreciating literature in its social and cultural context.",
  "course_objectives": [
    "Stimulate and sustain interest in Literature in English.",
    "Create awareness of general literary principles and functions of language.",
    "Appreciate literary works of different genres and cultures.",
    "Apply literary knowledge to analyse social, political and cultural issues.",
    "Develop literary interpretation and critical thinking skills."
  ],
  "topics": [
    {
      "chapter": "Drama",
      "objectives": [
        "Identify and define various types of drama.",
        "Analyse dramatic techniques used in prescribed texts.",
        "Interpret themes, plot and settings of plays."
      ],
      "subtopics": [
        "Types of drama (tragedy, comedy, tragicomedy, melodrama, farce, opera, etc.)",
        "Dramatic techniques (characterisation, dialogue, flashback, mime, music/dance, decor/scenery, acts/scenes, soliloquy/aside, figures of speech)",
        "Text interpretation (theme, plot, socio‑political context, setting)"
      ]
    },
    {
      "chapter": "Prose",
      "objectives": [
        "Differentiate types of prose (fiction, non‑fiction, faction).",
        "Analyse narrative techniques and devices.",
        "Interpret themes, plot and socio‑political context in prose texts."
      ],
      "subtopics": [
        "Types of prose (novel, novella, short story, biography, autobiography, memoir, faction)",
        "Narrative techniques (point of view, characterisation, language)",
        "Textual analysis (theme, plot, setting, socio‑political context)"
      ]
    },
    {
      "chapter": "Poetry",
      "objectives": [
        "Identify poetry types and features.",
        "Analyse poetic devices and their effects.",
        "Interpret thematic preoccupations and socio‑political relevance."
      ],
      "subtopics": [
        "Types of poetry (sonnet, ode, lyric, elegy, ballad, panegyric, epic, blank verse, etc.)",
        "Poetic devices (structure, imagery, sound – rhyme/rhythm/repetition/pun/onomatopoeia, diction, persona)",
        "Appreciation (thematic preoccupation, socio‑political relevance, style)"
      ]
    },
    {
      "chapter": "General Literary Principles",
      "objectives": [
        "Identify common literary terms and principles.",
        "Distinguish between terms and principles and use them in analysis.",
        "Relate literary terms and principles across genres."
      ],
      "subtopics": [
        "Literary terms (foreshadowing, suspense, monologue, symbolism, protagonist, antagonist, satire, stream of consciousness, etc.)",
        "Literary principles (direct imitation in play, versification in drama and poetry, narration of experiences, aesthetic value)",
        "Relationship between literary terms and principles"
      ]
    },
    {
      "chapter": "Literary Appreciation",
      "objectives": [
        "Analyse unseen passages from drama, prose and poetry.",
        "Identify literary devices in extracts.",
        "Provide meaningful interpretation of extracts."
      ],
      "subtopics": [
        "Unseen extracts from drama, prose and poetry",
        "Identification of literary devices",
        "Interpretation and contextual application"
      ]
    }
  ],
  "recommended_texts": [
    "Shakespeare: Antony & Cleopatra",
    "Efua Sutherland: The Marriage of Anansewa",
    "J.B. Priestley: An Inspector Calls",
    "Harper Lee: To Kill a Mockingbird",
    "Gabriel Okara: Once Upon a Time",
    "Wole Soyinka: Night",
    "Niyi Osundare: Not My Business"
  ]
}


];



export const getJambSyllabus = async (subject: string): Promise<JambSyllabus> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = jambDatabase.find(item => item.subject.toLowerCase() === subject.toLowerCase());
      if (data) resolve(data);
      else reject(new Error("Syllabus not found"));
    }, 1000); // simulate network delay
  });
};