// Curated resources. Tasks reference these by id (Task.resourceIds); the Resources view
// groups them by module. Add one by appending an object with a new id.
import type { Resource } from './types';

export const resources: Resource[] = [
  // ── Profile & funnel
  { id: 'r-jobscan', title: 'Jobscan — resume vs JD keyword match', url: 'https://www.jobscan.co/', kind: 'tool', modules: ['resume'], free: true, note: 'A few free scans/month; use for the ATS + keyword gap check.' },
  { id: 'r-resume-worded', title: 'Resume Worded — bullet & LinkedIn scoring', url: 'https://resumeworded.com/', kind: 'tool', modules: ['resume', 'linkedin'], free: true },
  { id: 'r-gh-profile-readme', title: 'GitHub Docs — Managing your profile README', url: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme', kind: 'docs', modules: ['github'], free: true },
  { id: 'r-shields', title: 'Shields.io — README badges', url: 'https://shields.io/', kind: 'tool', modules: ['github'], free: true },
  { id: 'r-excalidraw', title: 'Excalidraw — architecture diagrams', url: 'https://excalidraw.com/', kind: 'tool', modules: ['github', 'portfolio'], free: true },
  { id: 'r-choosealicense', title: 'Choose a License', url: 'https://choosealicense.com/', kind: 'docs', modules: ['github'], free: true },
  { id: 'r-gitignore', title: 'github/gitignore templates', url: 'https://github.com/github/gitignore', kind: 'docs', modules: ['github'], free: true },
  { id: 'r-vercel', title: 'Vercel — deploy static sites', url: 'https://vercel.com/', kind: 'platform', modules: ['portfolio'], free: true },

  // ── SQL
  { id: 'r-sqlbolt', title: 'SQLBolt — interactive lessons', url: 'https://sqlbolt.com/', kind: 'course', modules: ['sql'], free: true, note: 'Fastest way through the fundamentals.' },
  { id: 'r-mode-sql', title: 'Mode SQL Tutorial (basic → advanced, window functions)', url: 'https://mode.com/sql-tutorial/', kind: 'course', modules: ['sql'], free: true },
  { id: 'r-pg-exercises', title: 'PostgreSQL Exercises', url: 'https://pgexercises.com/', kind: 'practice', modules: ['sql'], free: true },
  { id: 'r-db-fiddle', title: 'DB Fiddle — SQL playground in the browser', url: 'https://www.db-fiddle.com/', kind: 'tool', modules: ['sql'], free: true },
  { id: 'r-lc-sql50', title: 'LeetCode — Top SQL 50 study plan', url: 'https://leetcode.com/studyplan/top-sql-50/', kind: 'practice', modules: ['sql'], free: true },
  { id: 'r-datalemur', title: 'DataLemur — SQL interview questions', url: 'https://datalemur.com/questions', kind: 'practice', modules: ['sql', 'stats'], free: true, note: 'Company-tagged analyst questions. Window-function heavy.' },
  { id: 'r-stratascratch', title: 'StrataScratch — data interview questions', url: 'https://www.stratascratch.com/', kind: 'practice', modules: ['sql', 'pyspark'], free: true },
  { id: 'r-hackerrank-sql', title: 'HackerRank — SQL practice & certification', url: 'https://www.hackerrank.com/domains/sql', kind: 'practice', modules: ['sql'], free: true },
  { id: 'r-use-the-index', title: 'Use The Index, Luke — SQL indexing & tuning', url: 'https://use-the-index-luke.com/', kind: 'book', modules: ['sql', 'dbms'], free: true },
  { id: 'r-pg-docs', title: 'PostgreSQL docs — Window Functions tutorial', url: 'https://www.postgresql.org/docs/current/tutorial-window.html', kind: 'docs', modules: ['sql'], free: true },

  // ── Aptitude
  { id: 'r-indiabix', title: 'IndiaBix — aptitude, logical, verbal', url: 'https://www.indiabix.com/', kind: 'practice', modules: ['aptitude'], free: true },
  { id: 'r-prepinsta', title: 'PrepInsta — company OA patterns (AMCAT, CoCubes, TCS, Capgemini)', url: 'https://prepinsta.com/', kind: 'practice', modules: ['aptitude'], free: true },
  { id: 'r-gfg-aptitude', title: 'GeeksforGeeks — Aptitude questions', url: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/', kind: 'practice', modules: ['aptitude'], free: true },
  { id: 'r-rs-aggarwal', title: 'R.S. Aggarwal — Quantitative Aptitude (book)', url: 'https://www.google.com/search?q=RS+Aggarwal+Quantitative+Aptitude', kind: 'book', modules: ['aptitude'], note: 'Classic question bank; use selectively for weak topics.' },
  { id: 'r-hackerrank', title: 'HackerRank — practice & skills certification', url: 'https://www.hackerrank.com/skills-verification', kind: 'practice', modules: ['aptitude', 'dsa'], free: true },

  // ── PySpark
  { id: 'r-spark-docs', title: 'PySpark API reference', url: 'https://spark.apache.org/docs/latest/api/python/index.html', kind: 'docs', modules: ['pyspark'], free: true },
  { id: 'r-spark-tuning', title: 'Spark SQL performance tuning guide', url: 'https://spark.apache.org/docs/latest/sql-performance-tuning.html', kind: 'docs', modules: ['pyspark'], free: true },
  { id: 'r-databricks-free', title: 'Databricks Free Edition', url: 'https://www.databricks.com/learn/free-edition', kind: 'platform', modules: ['pyspark'], free: true },
  { id: 'r-delta-docs', title: 'Delta Lake documentation', url: 'https://docs.delta.io/latest/index.html', kind: 'docs', modules: ['pyspark'], free: true },
  { id: 'r-sparkbyexamples', title: 'Spark By Examples — PySpark tutorial', url: 'https://sparkbyexamples.com/pyspark-tutorial/', kind: 'article', modules: ['pyspark'], free: true },
  { id: 'r-learning-spark', title: 'Learning Spark, 2nd ed. (Databricks, free PDF)', url: 'https://www.databricks.com/resources/ebook/learning-spark-from-oreilly', kind: 'book', modules: ['pyspark'], free: true },

  // ── Core CS
  { id: 'r-gate-smashers', title: 'Gate Smashers — DBMS / OS / CN playlists', url: 'https://www.youtube.com/@GateSmashers', kind: 'video', modules: ['dbms', 'os', 'cn'], free: true, note: 'Fast, exam-oriented. Good for numericals.' },
  { id: 'r-neso', title: 'Neso Academy — OS & Computer Networks', url: 'https://www.youtube.com/@nesoacademy', kind: 'video', modules: ['os', 'cn'], free: true },
  { id: 'r-gfg-dbms', title: 'GeeksforGeeks — DBMS', url: 'https://www.geeksforgeeks.org/dbms/', kind: 'article', modules: ['dbms'], free: true },
  { id: 'r-gfg-os', title: 'GeeksforGeeks — Operating Systems', url: 'https://www.geeksforgeeks.org/operating-systems/', kind: 'article', modules: ['os'], free: true },
  { id: 'r-gfg-cn', title: 'GeeksforGeeks — Computer Networks', url: 'https://www.geeksforgeeks.org/computer-network-tutorials/', kind: 'article', modules: ['cn'], free: true },
  { id: 'r-db-book', title: 'Silberschatz — Database System Concepts (slides & book)', url: 'https://www.db-book.com/', kind: 'book', modules: ['dbms'], free: true },
  { id: 'r-mongo-agg', title: 'MongoDB — Aggregation pipeline docs', url: 'https://www.mongodb.com/docs/manual/aggregation/', kind: 'docs', modules: ['dbms'], free: true },
  { id: 'r-ostep', title: 'OSTEP — Operating Systems: Three Easy Pieces (free)', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', kind: 'book', modules: ['os'], free: true },
  { id: 'r-kurose', title: 'Kurose & Ross — Computer Networking: A Top-Down Approach', url: 'https://gaia.cs.umass.edu/kurose_ross/index.php', kind: 'book', modules: ['cn'], free: true },
  { id: 'r-cloudflare-learning', title: 'Cloudflare Learning Center — DNS, TLS, DDoS explained', url: 'https://www.cloudflare.com/learning/', kind: 'article', modules: ['cn', 'sysdesign'], free: true },
  { id: 'r-subnet-practice', title: 'Subnetting Practice', url: 'https://subnettingpractice.com/', kind: 'practice', modules: ['cn'], free: true },
  { id: 'r-dev-java', title: 'dev.java — Learn Java (official)', url: 'https://dev.java/learn/', kind: 'docs', modules: ['oop'], free: true },
  { id: 'r-refactoring-guru', title: 'Refactoring.Guru — design patterns with Java examples', url: 'https://refactoring.guru/design-patterns', kind: 'article', modules: ['oop'], free: true },
  { id: 'r-baeldung', title: 'Baeldung — Java deep dives', url: 'https://www.baeldung.com/', kind: 'article', modules: ['oop'], free: true },

  // ── DSA
  { id: 'r-neetcode', title: 'NeetCode — roadmap & pattern videos', url: 'https://neetcode.io/roadmap', kind: 'practice', modules: ['dsa'], free: true, note: 'Use the pattern explanations; you don’t need all 150.' },
  { id: 'r-striver', title: 'Striver A2Z DSA sheet (takeUforward)', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', kind: 'practice', modules: ['dsa'], free: true },
  { id: 'r-leetcode', title: 'LeetCode', url: 'https://leetcode.com/problemset/', kind: 'practice', modules: ['dsa', 'sql'], free: true },
  { id: 'r-kunal', title: 'Kunal Kushwaha — Java + DSA bootcamp', url: 'https://www.youtube.com/@KunalKushwaha', kind: 'video', modules: ['dsa', 'oop'], free: true },
  { id: 'r-bigocheatsheet', title: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com/', kind: 'article', modules: ['dsa'], free: true },
  { id: 'r-visualgo', title: 'VisuAlgo — algorithm visualisations', url: 'https://visualgo.net/en', kind: 'tool', modules: ['dsa'], free: true },

  // ── Stats
  { id: 'r-statquest', title: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/@statquest', kind: 'video', modules: ['stats', 'ml'], free: true, note: 'Best intuition-first explanations for stats + ML.' },
  { id: 'r-khan-stats', title: 'Khan Academy — Statistics & Probability', url: 'https://www.khanacademy.org/math/statistics-probability', kind: 'course', modules: ['stats'], free: true },
  { id: 'r-seeing-theory', title: 'Seeing Theory — visual probability', url: 'https://seeing-theory.brown.edu/', kind: 'course', modules: ['stats'], free: true },
  { id: 'r-psds', title: 'Practical Statistics for Data Scientists (Bruce & Bruce)', url: 'https://www.oreilly.com/library/view/practical-statistics-for/9781492072935/', kind: 'book', modules: ['stats'] },
  { id: 'r-trustworthy-ab', title: 'Trustworthy Online Controlled Experiments (Kohavi et al.)', url: 'https://experimentguide.com/', kind: 'book', modules: ['stats', 'case'], note: 'The A/B testing book. Chapters 1–3 and 17–21 are enough.' },
  { id: 'r-evan-miller', title: 'Evan Miller — A/B testing tools & essays', url: 'https://www.evanmiller.org/ab-testing/', kind: 'tool', modules: ['stats'], free: true },
  { id: 'r-50-challenging', title: 'Fifty Challenging Problems in Probability (Mosteller)', url: 'https://www.google.com/search?q=Fifty+Challenging+Problems+in+Probability+Mosteller', kind: 'book', modules: ['stats'] },

  // ── ML
  { id: 'r-islr', title: 'ISLR / ISLP — An Introduction to Statistical Learning (free)', url: 'https://www.statlearning.com/', kind: 'book', modules: ['ml', 'stats'], free: true },
  { id: 'r-handson-ml', title: 'Hands-On Machine Learning (Géron), 3rd ed.', url: 'https://github.com/ageron/handson-ml3', kind: 'book', modules: ['ml', 'dl'] },
  { id: 'r-sklearn', title: 'scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', kind: 'docs', modules: ['ml'], free: true },
  { id: 'r-ml-interviews', title: 'Chip Huyen — Machine Learning Interviews book', url: 'https://huyenchip.com/ml-interviews-book/', kind: 'book', modules: ['ml', 'dl'], free: true },
  { id: 'r-google-ml-crash', title: 'Google Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course', kind: 'course', modules: ['ml'], free: true },
  { id: 'r-shap', title: 'SHAP documentation', url: 'https://shap.readthedocs.io/en/latest/', kind: 'docs', modules: ['ml'], free: true },
  { id: 'r-kaggle-learn', title: 'Kaggle Learn — micro-courses', url: 'https://www.kaggle.com/learn', kind: 'course', modules: ['ml', 'hackathons'], free: true },

  // ── DL & GenAI
  { id: 'r-3b1b', title: '3Blue1Brown — Neural networks series', url: 'https://www.3blue1brown.com/topics/neural-networks', kind: 'video', modules: ['dl'], free: true },
  { id: 'r-karpathy', title: 'Andrej Karpathy — Neural Networks: Zero to Hero', url: 'https://karpathy.ai/zero-to-hero.html', kind: 'video', modules: ['dl'], free: true },
  { id: 'r-cs231n', title: 'CS231n — CNNs for Visual Recognition (notes)', url: 'https://cs231n.github.io/', kind: 'course', modules: ['dl'], free: true },
  { id: 'r-d2l', title: 'Dive into Deep Learning (d2l.ai)', url: 'https://d2l.ai/', kind: 'book', modules: ['dl'], free: true },
  { id: 'r-illustrated-transformer', title: 'Jay Alammar — The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', kind: 'article', modules: ['dl'], free: true },
  { id: 'r-hf-course', title: 'Hugging Face — LLM / NLP course', url: 'https://huggingface.co/learn', kind: 'course', modules: ['dl'], free: true },
  { id: 'r-anthropic-prompting', title: 'Anthropic — Prompt engineering guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', kind: 'docs', modules: ['dl'], free: true },
  { id: 'r-langgraph-docs', title: 'LangGraph documentation', url: 'https://langchain-ai.github.io/langgraph/', kind: 'docs', modules: ['dl'], free: true },
  { id: 'r-pinecone-learn', title: 'Pinecone Learn — RAG, embeddings, chunking, reranking', url: 'https://www.pinecone.io/learn/', kind: 'article', modules: ['dl'], free: true },
  { id: 'r-deeplearning-ai', title: 'DeepLearning.AI short courses (RAG, agents, eval)', url: 'https://www.deeplearning.ai/short-courses/', kind: 'course', modules: ['dl'], free: true },

  // ── Case & analyst
  { id: 'r-case-in-point', title: 'Case in Point (Marc Cosentino)', url: 'https://www.google.com/search?q=Case+in+Point+Cosentino', kind: 'book', modules: ['case'] },
  { id: 'r-caseinterview', title: 'CaseInterview.com — Victor Cheng', url: 'https://www.caseinterview.com/', kind: 'video', modules: ['case'], free: true },
  { id: 'r-decode-conquer', title: 'Decode and Conquer (Lewis Lin) — product sense', url: 'https://www.google.com/search?q=Decode+and+Conquer+Lewis+Lin', kind: 'book', modules: ['case'] },
  { id: 'r-a16z-metrics', title: 'a16z — 16 Startup Metrics', url: 'https://a16z.com/16-startup-metrics/', kind: 'article', modules: ['case'], free: true },
  { id: 'r-exceljet', title: 'Exceljet — formulas & pivot tables', url: 'https://exceljet.net/', kind: 'article', modules: ['case'], free: true },
  { id: 'r-chandoo', title: 'Chandoo.org — Excel & dashboards', url: 'https://chandoo.org/', kind: 'article', modules: ['case'], free: true },
  { id: 'r-powerbi-learn', title: 'Microsoft Learn — Power BI training', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi', kind: 'course', modules: ['case'], free: true },
  { id: 'r-tableau-training', title: 'Tableau — free training videos', url: 'https://www.tableau.com/learn/training', kind: 'course', modules: ['case'], free: true },
  { id: 'r-tableau-public', title: 'Tableau Public — publish dashboards', url: 'https://public.tableau.com/', kind: 'platform', modules: ['case'], free: true },
  { id: 'r-swd', title: 'Storytelling with Data', url: 'https://www.storytellingwithdata.com/', kind: 'article', modules: ['case'], free: true },

  // ── System design
  { id: 'r-sd-primer', title: 'The System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', kind: 'docs', modules: ['sysdesign'], free: true },
  { id: 'r-hello-interview', title: 'Hello Interview — System Design in a Hurry', url: 'https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction', kind: 'article', modules: ['sysdesign'], free: true },
  { id: 'r-bytebytego', title: 'ByteByteGo — system design newsletter & videos', url: 'https://bytebytego.com/', kind: 'video', modules: ['sysdesign'] },
  { id: 'r-ddia', title: 'Designing Data-Intensive Applications (Kleppmann)', url: 'https://dataintensive.net/', kind: 'book', modules: ['sysdesign', 'dbms'] },

  // ── Behavioural & mocks
  { id: 'r-amazon-lps', title: 'Amazon Leadership Principles', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', kind: 'docs', modules: ['behavioural'], free: true },
  { id: 'r-tih-behavioral', title: 'Tech Interview Handbook — behavioural interviews', url: 'https://www.techinterviewhandbook.org/behavioral-interview/', kind: 'article', modules: ['behavioural'], free: true },
  { id: 'r-levels', title: 'levels.fyi — compensation data (India)', url: 'https://www.levels.fyi/', kind: 'tool', modules: ['behavioural'], free: true },
  { id: 'r-glassdoor', title: 'Glassdoor — interview reviews & salaries', url: 'https://www.glassdoor.co.in/', kind: 'tool', modules: ['behavioural', 'preinterview'], free: true },
  { id: 'r-pramp', title: 'Pramp (Exponent) — free peer mock interviews', url: 'https://www.pramp.com/', kind: 'platform', modules: ['mocks'], free: true },
  { id: 'r-interviewing-io', title: 'interviewing.io — anonymous mock interviews', url: 'https://interviewing.io/', kind: 'platform', modules: ['mocks'] },
  { id: 'r-exponent', title: 'Exponent — PM / DS / analyst interview prep', url: 'https://www.tryexponent.com/', kind: 'platform', modules: ['mocks', 'case'] },

  // ── Channels
  { id: 'r-linkedin-jobs', title: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/', kind: 'platform', modules: ['channels'], free: true },
  { id: 'r-naukri', title: 'Naukri', url: 'https://www.naukri.com/', kind: 'platform', modules: ['channels'], free: true },
  { id: 'r-instahyre', title: 'Instahyre', url: 'https://www.instahyre.com/', kind: 'platform', modules: ['channels'], free: true },
  { id: 'r-cutshort', title: 'Cutshort', url: 'https://cutshort.io/', kind: 'platform', modules: ['channels'], free: true },
  { id: 'r-hirect', title: 'Hirect', url: 'https://hirect.in/', kind: 'platform', modules: ['channels'], free: true },
  { id: 'r-wellfound', title: 'Wellfound (AngelList Talent)', url: 'https://wellfound.com/', kind: 'platform', modules: ['channels'], free: true },
  { id: 'r-yc-waas', title: 'Y Combinator — Work at a Startup', url: 'https://www.workatastartup.com/', kind: 'platform', modules: ['channels'], free: true },
  { id: 'r-unstop', title: 'Unstop — hackathons & hiring challenges', url: 'https://unstop.com/', kind: 'platform', modules: ['hackathons'], free: true },
  { id: 'r-devfolio', title: 'Devfolio — hackathons', url: 'https://devfolio.co/', kind: 'platform', modules: ['hackathons'], free: true },
  { id: 'r-hackerearth', title: 'HackerEarth — challenges', url: 'https://www.hackerearth.com/challenges/', kind: 'platform', modules: ['hackathons'], free: true },
  { id: 'r-mlh', title: 'Major League Hacking — events', url: 'https://mlh.io/', kind: 'platform', modules: ['hackathons'], free: true },
  { id: 'r-kaggle', title: 'Kaggle Competitions', url: 'https://www.kaggle.com/competitions', kind: 'platform', modules: ['hackathons', 'ml'], free: true },
  { id: 'r-hashnode', title: 'Hashnode — developer blog', url: 'https://hashnode.com/', kind: 'platform', modules: ['visibility'], free: true },
  { id: 'r-medium', title: 'Medium', url: 'https://medium.com/', kind: 'platform', modules: ['visibility'], free: true },
  { id: 'r-goodfirstissue', title: 'Good First Issue', url: 'https://goodfirstissue.dev/', kind: 'platform', modules: ['visibility'], free: true },
];

export const resourceById = new Map(resources.map((r) => [r.id, r]));
