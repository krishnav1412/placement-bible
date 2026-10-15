// PHASE 2 — INTERVIEW MACHINERY (Weeks 8–16)
import { defineModule } from './define';

export const phase2 = [
  // ───────────────────────── 2.1 DSA, sufficiency level (Java) ─────────────────────────
  // ~140 problems, weighted easy/medium. Goal: pattern recognition + confident mediums.
  ...defineModule('dsa', 2, {
    Foundations: [
      { id: 'dsa-001', title: 'Complexity: Big-O / Θ / Ω, common classes, amortised (ArrayList resize), space — analyse 10 snippets', priority: 'critical', resourceIds: ['r-bigocheatsheet'] },
      { id: 'dsa-002', title: 'Array basics in Java — LC 26 Remove Duplicates, 27 Remove Element, 283 Move Zeroes', priority: 'high' },
    ],
    Arrays: [
      { id: 'dsa-003', title: 'Two pointers — LC 167, 15 (3Sum), 11 (Container With Most Water), 125', priority: 'critical', resourceIds: ['r-neetcode'] },
      { id: 'dsa-004', title: 'Sliding window fixed + variable — LC 643, 1456, 3, 209, 424', priority: 'critical', resourceIds: ['r-neetcode'] },
      { id: 'dsa-005', title: 'Prefix sum — LC 303, 724, 238 (Product Except Self)', priority: 'high' },
      { id: 'dsa-006', title: 'Kadane’s & friends — LC 53, 152, 121', priority: 'critical' },
      { id: 'dsa-007', title: 'Dutch national flag + rotation — LC 75, 189', priority: 'medium' },
      { id: 'dsa-008', title: 'Merge intervals — LC 56, 57, 435', priority: 'high' },
    ],
    Strings: [
      { id: 'dsa-009', title: 'Strings in Java: StringBuilder, char[], immutability — LC 344, 14', priority: 'high' },
      { id: 'dsa-010', title: 'Palindromes & anagrams — LC 242, 49, 5, 409', priority: 'critical' },
      { id: 'dsa-011', title: 'Substring / pattern matching — LC 438, 76 (concept), 28 (+ KMP idea)', priority: 'medium' },
    ],
    Hashing: [
      { id: 'dsa-012', title: 'HashMap / HashSet patterns — LC 1 Two Sum, 217, 128, 387', priority: 'critical' },
      { id: 'dsa-013', title: 'Subarray sum with prefix + map — LC 560, 525', priority: 'high' },
    ],
    Sorting: [
      { id: 'dsa-014', title: 'Bubble / selection / insertion (concept + stability); implement merge sort — LC 912', priority: 'high' },
      { id: 'dsa-015', title: 'Quick sort (Lomuto / Hoare), counting sort; quickselect — LC 215', priority: 'medium' },
      { id: 'dsa-016', title: 'Custom comparators — LC 179, 973, 1636', priority: 'high' },
    ],
    'Binary search': [
      { id: 'dsa-017', title: 'Classic + first/last occurrence — LC 704, 34, 35', priority: 'critical' },
      { id: 'dsa-018', title: 'Rotated arrays + 2D — LC 33, 153, 74, 240', priority: 'high' },
      { id: 'dsa-019', title: 'Binary search on the answer — LC 875, 1011, 69', priority: 'high' },
    ],
    'Stack & queue': [
      { id: 'dsa-020', title: 'Stack — LC 20 Valid Parentheses, 155 Min Stack, 150 Evaluate RPN', priority: 'critical' },
      { id: 'dsa-021', title: 'Monotonic stack — LC 496, 739, 84 (concept)', priority: 'high' },
      { id: 'dsa-022', title: 'Queue / deque — LC 622 Circular Queue, 232, 239 Sliding Window Maximum', priority: 'medium' },
    ],
    'Linked list': [
      { id: 'dsa-023', title: 'Traversal, reversal (iterative + recursive), middle — LC 206, 92, 876', priority: 'critical' },
      { id: 'dsa-024', title: 'Floyd’s cycle, merge, remove nth — LC 141, 142, 21, 19', priority: 'critical' },
      { id: 'dsa-025', title: 'LC 234 Palindrome List, 160 Intersection, 2 Add Two Numbers', priority: 'medium' },
    ],
    Trees: [
      { id: 'dsa-026', title: 'Traversals recursive + iterative, level order — LC 94, 144, 145, 102', priority: 'critical' },
      { id: 'dsa-027', title: 'Height, diameter, balanced, invert — LC 104, 543, 110, 226', priority: 'critical' },
      { id: 'dsa-028', title: 'BST ops + validate + kth smallest — LC 700, 701, 98, 230', priority: 'high' },
      { id: 'dsa-029', title: 'LCA, path sum, right side view — LC 235, 236, 112, 113, 199', priority: 'high' },
    ],
    'Heap / priority queue': [
      { id: 'dsa-030', title: 'Top-K with PriorityQueue — LC 215, 347, 703', priority: 'high' },
      { id: 'dsa-031', title: 'Merge K sorted lists, median from data stream — LC 23, 295', priority: 'medium' },
    ],
    Graphs: [
      { id: 'dsa-032', title: 'Graph representations; BFS and DFS templates in Java (write from memory)', priority: 'critical' },
      { id: 'dsa-033', title: 'Grids & components — LC 200, 733, 547, 994', priority: 'critical' },
      { id: 'dsa-034', title: 'Cycle detection + topological sort (Kahn’s) — LC 207, 210', priority: 'high' },
      { id: 'dsa-035', title: 'Shortest path: BFS on unweighted (LC 1091) + Dijkstra concept (LC 743)', priority: 'medium' },
    ],
    'Recursion & backtracking': [
      { id: 'dsa-036', title: 'Recursion fundamentals: base case, recursion tree — LC 509, 50', priority: 'high' },
      { id: 'dsa-037', title: 'Subsets, permutations, combinations — LC 78, 90, 46, 77, 39', priority: 'high' },
      { id: 'dsa-038', title: 'N-Queens (LC 51) + Sudoku solver read-through (LC 37, concept)', priority: 'low' },
    ],
    'Dynamic programming': [
      { id: 'dsa-039', title: 'DP intro: memoisation vs tabulation — LC 70, 746', priority: 'critical' },
      { id: 'dsa-040', title: 'House robber — LC 198, 213', priority: 'high' },
      { id: 'dsa-041', title: 'Coin change — LC 322, 518', priority: 'high' },
      { id: 'dsa-042', title: '0/1 knapsack concept — LC 416 Partition Equal Subset Sum', priority: 'medium' },
      { id: 'dsa-043', title: 'LCS + edit distance — LC 1143, 72', priority: 'high' },
      { id: 'dsa-044', title: 'LIS + grid paths — LC 300, 62, 64', priority: 'high' },
    ],
    Greedy: [
      { id: 'dsa-045', title: 'Interval scheduling / activity selection — LC 452, 55, 45', priority: 'medium' },
      { id: 'dsa-046', title: 'Fractional knapsack (concept) — LC 134 Gas Station, 763 Partition Labels', priority: 'low' },
    ],
    'Patterns & mocks': [
      { id: 'dsa-047', title: 'Write your own one-page pattern sheet: signal → pattern → Java template', priority: 'critical', resourceIds: ['r-neetcode'] },
      { id: 'dsa-048', title: 'Pattern-recognition drill #1: 20 unseen problem statements, name the pattern in < 60 s each', priority: 'high' },
      { id: 'dsa-049', title: 'Pattern-recognition drill #2: 20 more statements', priority: 'high' },
      { id: 'dsa-050', title: 'HackerRank Problem Solving (Basic) certification test', priority: 'medium', resourceIds: ['r-hackerrank'] },
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `dsa-m${String(i + 1).padStart(2, '0')}`,
        title: `Timed mock round #${i + 1}: 2 unseen problems (easy + medium) in 45 minutes, talking aloud`,
        priority: 'high' as const,
      })),
      { id: 'dsa-051', title: 'Revision: re-solve 15 previously solved problems from a blank editor (mixed patterns)', priority: 'high' },
      { id: 'dsa-052', title: 'Revision: re-solve 15 more (the ones you struggled with first time)', priority: 'medium' },
    ],
  }),

  // ───────────────────────── 2.2 Statistics & Probability ─────────────────────────
  ...defineModule('stats', 2, {
    Descriptive: [
      { id: 'st-001', title: 'Mean / median / mode, variance & std dev (population vs sample, why n − 1), when median beats mean', priority: 'critical', resourceIds: ['r-statquest'] },
      { id: 'st-002', title: 'Skewness, kurtosis, percentiles, IQR, outlier rules (1.5 × IQR, z-score)', priority: 'high' },
    ],
    Probability: [
      { id: 'st-003', title: 'Probability rules: addition, multiplication, complement, independence vs mutually exclusive', priority: 'critical', resourceIds: ['r-seeing-theory'] },
      { id: 'st-004', title: 'Conditional probability & Bayes’ theorem — solve 6 (medical test, spam filter, two-child)', priority: 'critical' },
      { id: 'st-005', title: 'Distributions: uniform, normal, binomial, Poisson, exponential — shape, mean/var, when each applies', priority: 'critical' },
      { id: 'st-006', title: 'Expectation & variance of sums; linearity of expectation tricks', priority: 'medium' },
      { id: 'st-007', title: 'Central Limit Theorem — what it says, what it doesn’t; simulate it in Python', priority: 'critical' },
    ],
    Inference: [
      { id: 'st-008', title: 'Sampling methods; sampling, selection & survivorship bias with examples', priority: 'high' },
      { id: 'st-009', title: 'Standard error, confidence intervals, margin of error — compute and interpret correctly', priority: 'critical' },
      { id: 'st-010', title: 'Hypothesis testing: H0 / H1, p-value (and what it is NOT), α, Type I / II errors, power', priority: 'critical' },
      { id: 'st-011', title: 'Which test when: z vs t (one / two-sample, paired), chi-square, ANOVA — build a decision chart', priority: 'critical' },
      { id: 'st-012', title: 'Run each test in scipy on a real dataset; interpret the output in plain English', priority: 'high' },
      { id: 'st-013', title: 'Correlation vs causation, Simpson’s paradox, confounders — one worked example each', priority: 'high' },
    ],
    'A/B testing': [
      { id: 'st-014', title: 'A/B design: hypothesis, unit of randomisation, primary vs guardrail metrics', priority: 'critical', resourceIds: ['r-trustworthy-ab'] },
      { id: 'st-015', title: 'Sample size & power analysis: by hand + statsmodels; MDE', priority: 'critical', resourceIds: ['r-evan-miller'] },
      { id: 'st-016', title: 'Duration, novelty effect, peeking, multiple testing (Bonferroni, BH), sample-ratio mismatch', priority: 'critical' },
      { id: 'st-017', title: 'A/B case drill: design "new checkout button" test end-to-end, out loud', priority: 'critical' },
      { id: 'st-018', title: 'Causal inference basics: control groups, diff-in-diff, natural experiments, RDD (concept)', priority: 'medium' },
    ],
    Puzzles: [
      { id: 'st-019', title: 'Probability puzzles: 10 classics (Monty Hall, birthday, coin streaks, dice EV)', priority: 'high', resourceIds: ['r-50-challenging'] },
      { id: 'st-020', title: 'Brainteasers: 10 more (expected value, geometric probability, gambler’s ruin)', priority: 'medium' },
      { id: 'st-021', title: 'Self-test: 20 stats questions out loud (Interview bank → Stats/ML)', priority: 'critical' },
    ],
  }),

  // ───────────────────────── 2.3 Machine Learning ─────────────────────────
  ...defineModule('ml', 2, {
    Foundations: [
      { id: 'ml-001', title: 'Supervised / unsupervised / RL; parametric vs non-parametric', priority: 'medium' },
      { id: 'ml-002', title: 'Bias-variance tradeoff; diagnose over- / underfitting with learning curves', priority: 'critical', resourceIds: ['r-islr'] },
      { id: 'ml-003', title: 'Train/val/test, k-fold, stratified, time-series CV; data leakage — 5 real examples', priority: 'critical' },
    ],
    'Linear models': [
      { id: 'ml-004', title: 'Linear regression: assumptions, OLS, R² vs adjusted R², residual analysis', priority: 'critical', resourceIds: ['r-islr', 'r-statquest'] },
      { id: 'ml-005', title: 'Multicollinearity & VIF; heteroscedasticity — detect and fix', priority: 'high' },
      { id: 'ml-006', title: 'Logistic regression: sigmoid, log-odds, coefficient interpretation, decision boundary, why not MSE', priority: 'critical' },
      { id: 'ml-007', title: 'Regularisation: L1 / Lasso, L2 / Ridge, ElasticNet — effect on coefficients (with geometry)', priority: 'critical' },
    ],
    Evaluation: [
      { id: 'ml-008', title: 'Confusion matrix, accuracy, precision, recall, F1, specificity, ROC-AUC vs PR-AUC', priority: 'critical' },
      { id: 'ml-009', title: '"When accuracy misleads" — turn your Outright class-imbalance catch into a 2-minute answer', priority: 'critical' },
      { id: 'ml-010', title: 'Class imbalance: resampling, SMOTE, class weights, threshold tuning', priority: 'critical' },
      { id: 'ml-011', title: 'Regression metrics: MSE, RMSE, MAE, MAPE, R² — which when', priority: 'high' },
    ],
    'Trees & ensembles': [
      { id: 'ml-012', title: 'Decision trees: entropy, Gini, information gain, pruning', priority: 'critical' },
      { id: 'ml-013', title: 'Bagging & Random Forest: bootstrap, feature randomness, OOB error', priority: 'critical' },
      { id: 'ml-014', title: 'Boosting: AdaBoost, Gradient Boosting, XGBoost, LightGBM — why boosting ≠ bagging', priority: 'critical' },
    ],
    'Other algorithms': [
      { id: 'ml-015', title: 'SVM: margin, soft margin (C), kernels, the kernel trick', priority: 'medium' },
      { id: 'ml-016', title: 'kNN: distance metrics, choosing k, curse of dimensionality', priority: 'medium' },
      { id: 'ml-017', title: 'Naive Bayes: the independence assumption and why it works anyway', priority: 'medium' },
      { id: 'ml-018', title: 'Clustering: k-means (assumptions, init, elbow, silhouette), hierarchical, DBSCAN', priority: 'high' },
      { id: 'ml-019', title: 'PCA maths (covariance → eigenvectors, explained variance); t-SNE vs UMAP', priority: 'high' },
    ],
    'Features & tuning': [
      { id: 'ml-020', title: 'Feature engineering: one-hot / label / target encoding, scaling, binning, interactions, datetime, missing values', priority: 'critical' },
      { id: 'ml-021', title: 'Feature selection: filter, wrapper, embedded methods', priority: 'medium' },
      { id: 'ml-022', title: 'Hyperparameter tuning: grid, random, Bayesian (Optuna)', priority: 'medium' },
    ],
    Production: [
      { id: 'ml-023', title: 'Deployment: batch vs real-time serving, monitoring, data / concept drift, retraining', priority: 'high' },
      { id: 'ml-024', title: 'Interpretability: feature importance, SHAP, LIME, Grad-CAM (explain NeuroLens’ heatmaps)', priority: 'high', resourceIds: ['r-shap'] },
    ],
    'Hands-on & self-test': [
      { id: 'ml-025', title: 'End-to-end sklearn Pipeline (ColumnTransformer + CV + tuning) on a Kaggle tabular dataset', priority: 'high', resourceIds: ['r-sklearn'] },
      { id: 'ml-026', title: 'ML rapid-fire: 25 questions out loud (Interview bank → Stats/ML)', priority: 'critical', resourceIds: ['r-ml-interviews'] },
      { id: 'ml-027', title: 'Whiteboard: explain 6 algorithms in 3 minutes each (LR, logistic, tree, RF, GBM, k-means)', priority: 'high' },
    ],
  }),

  // ───────────────────────── 2.4 Deep Learning & GenAI ─────────────────────────
  ...defineModule('dl', 2, {
    'NN fundamentals': [
      { id: 'dl-001', title: 'Neurons, layers, weights, forward pass', priority: 'high', resourceIds: ['r-3b1b'] },
      { id: 'dl-002', title: 'Activations: sigmoid, tanh, ReLU, LeakyReLU, softmax; vanishing gradients', priority: 'high' },
      { id: 'dl-003', title: 'Loss functions: MSE, binary vs categorical cross-entropy', priority: 'high' },
      { id: 'dl-004', title: 'Backprop, gradient descent, SGD, momentum, Adam, LR scheduling', priority: 'critical', resourceIds: ['r-3b1b', 'r-karpathy'] },
      { id: 'dl-005', title: 'Regularisation in DL: dropout, batch norm, early stopping, data augmentation', priority: 'high' },
    ],
    Architectures: [
      { id: 'dl-006', title: 'CNNs: convolution, filters, stride, padding, pooling, receptive field', priority: 'high', resourceIds: ['r-cs231n'] },
      { id: 'dl-007', title: 'LeNet → AlexNet → VGG → ResNet (skip connections); transfer learning vs fine-tuning — use NeuroLens', priority: 'high' },
      { id: 'dl-008', title: 'RNNs, vanishing gradient, LSTM gates, GRU', priority: 'medium' },
      { id: 'dl-009', title: 'Attention, self-attention (Q, K, V), multi-head, positional encoding', priority: 'critical', resourceIds: ['r-illustrated-transformer'] },
      { id: 'dl-010', title: 'Encoder vs decoder; BERT vs GPT architectures', priority: 'critical' },
    ],
    LLMs: [
      { id: 'dl-011', title: 'LLMs: pretraining, fine-tuning, instruction tuning, RLHF / DPO, tokenisation, context windows, temperature / top-p', priority: 'critical', resourceIds: ['r-hf-course'] },
      { id: 'dl-012', title: 'Prompt engineering: zero / few-shot, chain-of-thought, structured output, system prompts — write 5 prompts', priority: 'high', resourceIds: ['r-anthropic-prompting'] },
      { id: 'dl-013', title: 'PEFT, LoRA, quantisation — concept level', priority: 'medium' },
      { id: 'dl-014', title: 'Agents: tool use / function calling, multi-step orchestration, LangChain vs LangGraph, agent evaluation', priority: 'high', resourceIds: ['r-langgraph-docs'] },
      { id: 'dl-015', title: 'LLM evaluation: LLM-as-judge, guardrails, hallucination detection, benchmarks', priority: 'high' },
      { id: 'dl-016', title: 'KYRO articulation: the 3-tier engine (19 rules → session heuristics → Gemini judge) and why rule-dominant — 3 minutes, recorded', priority: 'critical' },
    ],
    'RAG project': [
      { id: 'dl-017', title: 'RAG concepts: embeddings, chunking strategies, vector DBs (FAISS / Chroma / Pinecone), retrieval, reranking, hybrid search', priority: 'critical', resourceIds: ['r-pinecone-learn'] },
      { id: 'dl-018', title: 'RAG project: scope it (e.g. "Ask SEBI circulars" or "Ask VIT placement docs"), pick stack, README skeleton', priority: 'critical' },
      { id: 'dl-019', title: 'RAG project: ingestion → chunking → embeddings into Chroma / FAISS', priority: 'critical' },
      { id: 'dl-020', title: 'RAG project: retrieval + generation with citations; hybrid search (BM25 + vector)', priority: 'high' },
      { id: 'dl-021', title: 'RAG project: reranking + a 25-question eval set; measure hit-rate and faithfulness', priority: 'high' },
      { id: 'dl-022', title: 'RAG project: Streamlit UI, deploy, README with architecture + eval numbers', priority: 'high' },
      { id: 'dl-023', title: 'Add the RAG project to resume variants, LinkedIn Featured and the portfolio', priority: 'medium' },
    ],
    'Self-test': [
      { id: 'dl-024', title: 'Self-test: 20 DL / GenAI questions out loud (Interview bank → Stats/ML)', priority: 'critical' },
    ],
  }),

  // ───────────────────────── 2.5 Analyst: Business & Case ─────────────────────────
  ...defineModule('case', 2, {
    Guesstimates: [
      { id: 'cs-001', title: 'Guesstimate method: top-down vs bottom-up, structure, sanity checks — study 2 worked examples', priority: 'critical' },
      { id: 'cs-002', title: 'Guesstimate drill set 1 — 5 problems out loud (Interview bank → Case/Guesstimate)', priority: 'high' },
      { id: 'cs-003', title: 'Guesstimate drill set 2 — 5 problems', priority: 'high' },
      { id: 'cs-004', title: 'Guesstimate drill set 3 — 5 problems', priority: 'medium' },
      { id: 'cs-005', title: 'Guesstimate drill set 4 — 5 problems, 7 minutes each', priority: 'medium' },
    ],
    'Case frameworks': [
      { id: 'cs-006', title: 'Profitability framework: revenue (price × volume) − cost (fixed + variable)', priority: 'critical', resourceIds: ['r-case-in-point'] },
      { id: 'cs-007', title: 'Market entry & growth strategy frameworks', priority: 'high', resourceIds: ['r-caseinterview'] },
      { id: 'cs-008', title: 'Root-cause analysis & pricing frameworks', priority: 'high' },
      { id: 'cs-009', title: 'Case drills: 3 full cases out loud (profitability, entry, RCA)', priority: 'high' },
    ],
    'Product & metrics': [
      { id: 'cs-010', title: 'Product sense: defining metrics, north-star vs input metrics, trade-offs (Swiggy, Zepto, Instagram)', priority: 'high', resourceIds: ['r-decode-conquer'] },
      { id: 'cs-011', title: 'Metrics I: DAU / WAU / MAU, stickiness, retention curves, cohort analysis, churn', priority: 'critical', resourceIds: ['r-a16z-metrics'] },
      { id: 'cs-012', title: 'Metrics II: ARPU, CAC, LTV, LTV:CAC, payback, funnels, NPS, GMV, take rate', priority: 'critical', resourceIds: ['r-a16z-metrics'] },
      { id: 'cs-013', title: 'Diagnostic framing: "metric X dropped 20% — why?" (validate → segment → internal vs external → hypothesis)', priority: 'critical' },
      { id: 'cs-014', title: 'Diagnostic drills: 5 metric-drop questions out loud', priority: 'critical' },
    ],
    Excel: [
      { id: 'cs-015', title: 'Excel: pivot tables, VLOOKUP / XLOOKUP, INDEX-MATCH', priority: 'critical', resourceIds: ['r-exceljet'] },
      { id: 'cs-016', title: 'Excel: conditional formatting, what-if (goal seek, data tables), Solver basics', priority: 'high', resourceIds: ['r-exceljet', 'r-chandoo'] },
      { id: 'cs-017', title: 'Excel timed workbook: analyst-style task in 40 minutes', priority: 'high' },
    ],
    'BI dashboards': [
      { id: 'cs-018', title: 'Pick a primary BI tool (Power BI is most common in Indian analyst JDs), install, connect a dataset', priority: 'high', resourceIds: ['r-powerbi-learn', 'r-tableau-training'] },
      { id: 'cs-019', title: 'BI fundamentals: calculated fields, parameters, LOD expressions (Tableau) / DAX measures (Power BI)', priority: 'high' },
      { id: 'cs-020', title: 'Dashboard 1: Faculty Review Analytics — sentiment by department, trends, drill-down', priority: 'high' },
      { id: 'cs-021', title: 'Dashboard 2: e-commerce KPI dashboard (cohorts, funnel, revenue) from a public dataset', priority: 'high' },
      { id: 'cs-022', title: 'Dashboard 3: markets dashboard — Nifty sector performance / your trading watchlist', priority: 'medium' },
      { id: 'cs-023', title: 'Publish dashboards (Tableau Public / Power BI screenshots + PBIX on GitHub); add to portfolio', priority: 'medium', resourceIds: ['r-tableau-public'] },
    ],
    Storytelling: [
      { id: 'cs-024', title: 'Storytelling with data: what / so what / now what; choosing the right chart', priority: 'high', resourceIds: ['r-swd'] },
      { id: 'cs-025', title: 'Write a 150-word executive summary for each dashboard', priority: 'medium' },
      { id: 'cs-026', title: 'One-page feasibility memo on a business idea (market size, unit economics, risks) — uses your markets interest', priority: 'low' },
    ],
  }),

  // ───────────────────────── 2.6 System Design (light) ─────────────────────────
  ...defineModule('sysdesign', 2, {
    'Building blocks': [
      { id: 'sd-001', title: 'Client-server, load balancing (L4 vs L7, algorithms), reverse proxy', priority: 'medium', resourceIds: ['r-sd-primer'] },
      { id: 'sd-002', title: 'Vertical vs horizontal scaling; stateless services', priority: 'medium' },
      { id: 'sd-003', title: 'Databases at scale: SQL vs NoSQL choice, replication, sharding, indexing at scale', priority: 'medium' },
      { id: 'sd-004', title: 'Caching: Redis, cache-aside vs write-through vs write-back, invalidation, TTLs', priority: 'medium' },
      { id: 'sd-005', title: 'Message queues: Kafka vs RabbitMQ, pub/sub — explain with KYRO’s Redis pub/sub', priority: 'medium' },
      { id: 'sd-006', title: 'API design: REST, versioning, pagination, rate limiting, idempotency keys', priority: 'medium' },
      { id: 'sd-007', title: 'CAP, consistency models (strong vs eventual), microservices vs monolith', priority: 'medium' },
      { id: 'sd-008', title: 'CDN, DNS, reverse proxy — where each sits in the request path', priority: 'low' },
    ],
    'Design exercises': [
      { id: 'sd-009', title: 'Design: URL shortener', priority: 'medium', resourceIds: ['r-hello-interview'] },
      { id: 'sd-010', title: 'Design: rate limiter (token bucket vs sliding window)', priority: 'medium' },
      { id: 'sd-011', title: 'Design: notification system', priority: 'low' },
      { id: 'sd-012', title: 'Design: booking system — present Confer’s real architecture and how you’d scale it 100×', priority: 'high' },
    ],
  }),

  // ───────────────────────── 2.7 Behavioural & Storytelling ─────────────────────────
  ...defineModule('behavioural', 2, {
    'STAR stories': [
      { id: 'bh-001', title: 'Learn STAR; open Interview → STAR builder and skim every story card', priority: 'critical', resourceIds: ['r-tih-behavioral'] },
      { id: 'bh-002', title: 'STAR: Outright internship — the class-imbalance catch is your hero story', priority: 'critical' },
      { id: 'bh-003', title: 'STAR: KYRO', priority: 'critical' },
      { id: 'bh-004', title: 'STAR: Confer (100+ users, 15+ experts in week one)', priority: 'critical' },
      { id: 'bh-005', title: 'STAR: Faculty Review Analytics', priority: 'high' },
      { id: 'bh-006', title: 'STAR: HSBC Business Hackathon (penultimate round)', priority: 'high' },
      { id: 'bh-007', title: 'STAR: E-Cell VIT', priority: 'medium' },
      { id: 'bh-008', title: 'STAR: a failure (e.g. two bad interviews → building this system)', priority: 'high' },
      { id: 'bh-009', title: 'STAR: a conflict', priority: 'high' },
      { id: 'bh-010', title: 'STAR: a time you changed your mind', priority: 'medium' },
      { id: 'bh-011', title: 'STAR: a time you caught an error', priority: 'high' },
      { id: 'bh-012', title: 'Rehearse every STAR story out loud, 2 minutes each — record and trim', priority: 'critical' },
    ],
    'Core answers': [
      { id: 'bh-013', title: '"Tell me about yourself" — 90-second script v1 (present → past → why this role)', priority: 'critical' },
      { id: 'bh-014', title: 'TMAY: record, cut to 90 s, re-record until fluent (3 takes minimum)', priority: 'critical' },
      { id: 'bh-015', title: '"Why this company" research template — fill it once for your top Tier 1 target', priority: 'high' },
      { id: 'bh-016', title: 'Strengths & weaknesses — no clichés, each with evidence and what you’re doing about it', priority: 'high' },
      { id: 'bh-017', title: '"Why analyst / DS?" and "Why not placed yet?" — honest, forward-looking answers', priority: 'high' },
      { id: 'bh-018', title: 'Handling "I don’t know" gracefully — 3 scripted responses, practise them', priority: 'high' },
    ],
    'Amazon & logistics': [
      { id: 'bh-019', title: 'Amazon Leadership Principles: map one story to each of the 16 (coverage grid in STAR builder)', priority: 'high', resourceIds: ['r-amazon-lps'] },
      { id: 'bh-020', title: 'Questions to ask the interviewer — list 10; pick 3 per round type', priority: 'medium' },
      { id: 'bh-021', title: 'Salary / CTC basics: fixed vs variable, joining bonus, ESOPs; research ranges', priority: 'medium', resourceIds: ['r-levels', 'r-glassdoor'] },
    ],
  }),

  // ───────────────────────── 2.8 Mock Interviews ─────────────────────────
  ...defineModule('mocks', 2, {
    Setup: [
      { id: 'mk-001', title: 'Sign up: Pramp, interviewing.io, Exponent free resources', priority: 'high', resourceIds: ['r-pramp', 'r-interviewing-io', 'r-exponent'] },
      { id: 'mk-002', title: 'Recruit 2 mock partners (VIT peers) + 1 senior; fix a weekly slot', priority: 'critical' },
      { id: 'mk-003', title: 'Recording setup (OBS / phone) + mock review template: what went wrong → why → fix → new task', priority: 'high' },
    ],
    'Project deep-dives': [
      { id: 'mk-004', title: 'Deep-dive drill: 10 minutes on KYRO, unprompted, to a sceptical interviewer — record it', priority: 'critical' },
      { id: 'mk-005', title: 'Deep-dive drill: Confer, 10 minutes — record it', priority: 'high' },
      { id: 'mk-006', title: 'Deep-dive drill: Faculty Review Analytics + NeuroLens, 5 minutes each', priority: 'high' },
    ],
    'Senior mocks & review': [
      { id: 'mk-007', title: 'Mock with a senior working in analytics (SQL + case)', priority: 'high' },
      { id: 'mk-008', title: 'After 6 mocks: compile your top 5 recurring weaknesses and add a task for each', priority: 'high'},
    ],
  }),
];
