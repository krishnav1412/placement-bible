// PHASE 1 — CORE TECHNICAL REBUILD (Weeks 2–7)
import { defineModule } from './define';

export const phase1 = [
  // ───────────────────────── 1.1 SQL, complete rebuild ─────────────────────────
  ...defineModule('sql', 1, {
    Setup: [
      { id: 'sql-001', title: 'Set up a playground: PostgreSQL locally or DB Fiddle + load a sample DB (pgexercises club schema)', priority: 'high', resourceIds: ['r-pg-exercises', 'r-db-fiddle'] },
    ],
    Fundamentals: [
      { id: 'sql-002', title: 'Learn SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, aliases + logical order of execution', priority: 'critical', resourceIds: ['r-sqlbolt', 'r-mode-sql'] },
      { id: 'sql-003', title: 'Practise 10 basic SELECT problems (SQLBolt 1–6 + pgexercises Basic)', priority: 'critical', resourceIds: ['r-sqlbolt', 'r-pg-exercises'] },
    ],
    Filtering: [
      { id: 'sql-004', title: 'Learn comparison & logical ops, IN, BETWEEN, LIKE, NULL handling, IS NULL vs = NULL, COALESCE', priority: 'critical' },
      { id: 'sql-005', title: 'Self-test: predict the output of 10 NULL edge cases (NOT IN with NULLs, COUNT(col) vs COUNT(*), NULL = NULL)', priority: 'high' },
    ],
    Aggregations: [
      { id: 'sql-006', title: 'Learn COUNT/SUM/AVG/MIN/MAX, GROUP BY, HAVING; WHERE vs HAVING', priority: 'critical' },
      { id: 'sql-007', title: 'Practise 8 aggregation problems', priority: 'critical', resourceIds: ['r-pg-exercises'] },
    ],
    Joins: [
      { id: 'sql-008', title: 'Learn INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF joins — and when each is the correct choice', priority: 'critical' },
      { id: 'sql-009', title: 'Join pitfalls: fan-out, duplicate rows, join order, filter in ON vs WHERE for LEFT JOIN', priority: 'critical' },
      { id: 'sql-010', title: 'Practise 10 join problems (include 2 self-joins and 2 anti-joins)', priority: 'critical' },
    ],
    Subqueries: [
      { id: 'sql-011', title: 'Learn scalar, correlated, IN / EXISTS / ANY / ALL subqueries', priority: 'high' },
      { id: 'sql-012', title: 'Subquery vs JOIN vs EXISTS — rewrite 3 queries each way and compare EXPLAIN output', priority: 'medium' },
      { id: 'sql-013', title: 'Practise 6 subquery problems', priority: 'high' },
    ],
    CTEs: [
      { id: 'sql-014', title: 'Learn WITH, chained CTEs, recursive CTEs (org chart depth, date series)', priority: 'high' },
      { id: 'sql-015', title: 'Practise: rewrite 3 nested queries as CTEs + solve 2 recursive problems', priority: 'high' },
    ],
    'Window functions': [
      { id: 'sql-016', title: 'ROW_NUMBER vs RANK vs DENSE_RANK — run all three on tied data and explain the difference', priority: 'critical', resourceIds: ['r-mode-sql'] },
      { id: 'sql-017', title: 'LAG, LEAD, FIRST_VALUE, LAST_VALUE (the default-frame gotcha), NTILE', priority: 'critical' },
      { id: 'sql-018', title: 'PARTITION BY vs GROUP BY — solve the same question both ways', priority: 'critical' },
      { id: 'sql-019', title: 'Running totals, 3/7-day moving averages, cumulative sums', priority: 'critical' },
      { id: 'sql-020', title: 'Frame clauses: ROWS vs RANGE, UNBOUNDED PRECEDING, CURRENT ROW, N PRECEDING', priority: 'high' },
      { id: 'sql-021', title: 'Practise 12 window-function problems (DataLemur + StrataScratch window sets)', priority: 'critical', resourceIds: ['r-datalemur', 'r-stratascratch'] },
      { id: 'sql-022', title: 'Self-test: 5 window questions from memory, no notes, 25-minute timer', priority: 'high' },
    ],
    'Conditional logic': [
      { id: 'sql-023', title: 'CASE WHEN, conditional aggregation SUM(CASE …), pivoting without PIVOT', priority: 'high' },
      { id: 'sql-024', title: 'Practise 5 pivot / conditional-aggregation problems', priority: 'high' },
    ],
    'Dates & strings': [
      { id: 'sql-025', title: 'Date/time: EXTRACT, DATE_TRUNC, intervals, date arithmetic, generate_series', priority: 'high' },
      { id: 'sql-026', title: 'String functions + regex basics (SUBSTRING, POSITION, CONCAT, TRIM, LOWER, ~ / REGEXP)', priority: 'medium' },
      { id: 'sql-027', title: 'Practise 6 date / string problems', priority: 'high' },
    ],
    'Sets, DDL & DML': [
      { id: 'sql-028', title: 'Set operations: UNION vs UNION ALL, INTERSECT, EXCEPT — which ones dedupe', priority: 'medium' },
      { id: 'sql-029', title: 'DDL/DML: CREATE, ALTER, INSERT, UPDATE, DELETE; constraints (PK, FK, UNIQUE, CHECK, NOT NULL, DEFAULT)', priority: 'medium' },
      { id: 'sql-030', title: 'Build a 4-table drill schema (users, orders, products, events) with seed data — reuse it for every pattern below', priority: 'medium' },
    ],
    Performance: [
      { id: 'sql-031', title: 'Indexes: B-tree, composite (leftmost prefix), covering; when an index does NOT help', priority: 'high', resourceIds: ['r-use-the-index'] },
      { id: 'sql-032', title: 'EXPLAIN / EXPLAIN ANALYZE: read 3 plans (seq vs index scan, nested loop vs hash join) and fix one slow query', priority: 'medium', resourceIds: ['r-use-the-index'] },
      { id: 'sql-033', title: 'Transactions, ACID, isolation levels, locking — from the SQL side (BEGIN / COMMIT / ROLLBACK)', priority: 'medium' },
    ],
    'Interview patterns': [
      { id: 'sql-034', title: 'Nth highest salary — 3 ways (LIMIT/OFFSET, DENSE_RANK, correlated subquery)', priority: 'critical' },
      { id: 'sql-035', title: 'Find and delete duplicates (GROUP BY HAVING, ROW_NUMBER, self-join delete)', priority: 'critical' },
      { id: 'sql-036', title: 'Top-N per group (ROW_NUMBER over PARTITION BY)', priority: 'critical' },
      { id: 'sql-037', title: 'Consecutive / streak problems (3+ consecutive login days)', priority: 'critical' },
      { id: 'sql-038', title: 'Gaps and islands (row-number difference trick)', priority: 'critical' },
      { id: 'sql-039', title: 'Month-over-month growth with LAG + DATE_TRUNC', priority: 'critical' },
      { id: 'sql-040', title: 'Cohort retention matrix (signup month × months since signup)', priority: 'critical' },
      { id: 'sql-041', title: 'Funnel conversion: step counts and step-to-step rates from an events table', priority: 'critical' },
      { id: 'sql-042', title: 'Median without a MEDIAN function (ROW_NUMBER + COUNT, PERCENTILE_CONT)', priority: 'high' },
      { id: 'sql-043', title: 'Self-join hierarchies: employees earning more than their manager, reporting depth', priority: 'high' },
      { id: 'sql-044', title: 'Pattern drill: re-solve all 10 patterns from a blank editor in one sitting, timed', priority: 'critical' },
    ],
    'Practice ladder': [
      { id: 'sql-045', title: 'LeetCode SQL 50 — Select + Basic Joins (14 problems)', priority: 'critical', resourceIds: ['r-lc-sql50'] },
      { id: 'sql-046', title: 'LeetCode SQL 50 — Basic Aggregate Functions (8)', priority: 'critical', resourceIds: ['r-lc-sql50'] },
      { id: 'sql-047', title: 'LeetCode SQL 50 — Sorting and Grouping (7)', priority: 'critical', resourceIds: ['r-lc-sql50'] },
      { id: 'sql-048', title: 'LeetCode SQL 50 — Advanced Select and Joins (7)', priority: 'high', resourceIds: ['r-lc-sql50'] },
      { id: 'sql-049', title: 'LeetCode SQL 50 — Subqueries (7)', priority: 'high', resourceIds: ['r-lc-sql50'] },
      { id: 'sql-050', title: 'LeetCode SQL 50 — Advanced String Functions / Regex / Clause (7)', priority: 'high', resourceIds: ['r-lc-sql50'] },
      { id: 'sql-051', title: 'DataLemur — 10 easy problems', priority: 'critical', resourceIds: ['r-datalemur'] },
      { id: 'sql-052', title: 'DataLemur — 10 medium problems (Amazon / FAANG tagged)', priority: 'critical', resourceIds: ['r-datalemur'] },
      { id: 'sql-053', title: 'StrataScratch — 8 analyst-style mediums with business context', priority: 'high', resourceIds: ['r-stratascratch'] },
      { id: 'sql-054', title: 'HackerRank SQL — Advanced Select + Aggregation sets (10)', priority: 'medium', resourceIds: ['r-hackerrank-sql'] },
      { id: 'sql-055', title: 'HackerRank SQL (Basic) certification test', priority: 'high', resourceIds: ['r-hackerrank-sql'] },
      { id: 'sql-056', title: 'HackerRank SQL (Intermediate) certification test', priority: 'medium', resourceIds: ['r-hackerrank-sql'] },
    ],
    'Module test': [
      { id: 'sql-057', title: 'Mock SQL round: 3 questions in 30 minutes, thinking aloud — record it', priority: 'critical' },
      { id: 'sql-058', title: 'Module self-test: 10 random problems across all patterns; log every miss as a new task', priority: 'critical' },
    ],
  }),

  // ───────────────────────── 1.2 Aptitude & Online Assessments ─────────────────────────
  ...defineModule('aptitude', 1, {
    Diagnostic: [
      { id: 'apt-001', title: 'Diagnostic: one full timed aptitude test cold (quant + logical + verbal); note the weakest 5 topics', priority: 'critical', resourceIds: ['r-prepinsta', 'r-indiabix'] },
    ],
    Quantitative: [
      { id: 'apt-002', title: 'Number systems, divisibility, remainders, unit digits — shortcuts + 20 questions', priority: 'high' },
      { id: 'apt-003', title: 'HCF & LCM — shortcuts + 15 questions', priority: 'medium' },
      { id: 'apt-004', title: 'Percentages — fraction equivalents, successive change + 20 questions', priority: 'critical' },
      { id: 'apt-005', title: 'Profit & loss, discounts, marked price — 20 questions', priority: 'critical' },
      { id: 'apt-006', title: 'Ratio & proportion, partnerships, ages — 20 questions', priority: 'high' },
      { id: 'apt-007', title: 'Averages — 15 questions', priority: 'high' },
      { id: 'apt-008', title: 'Mixtures & alligation — rule + 15 questions', priority: 'medium' },
      { id: 'apt-009', title: 'Time, speed & distance — relative speed, trains, boats & streams — 20 questions', priority: 'critical' },
      { id: 'apt-010', title: 'Time & work, pipes & cisterns (LCM method) — 20 questions', priority: 'critical' },
      { id: 'apt-011', title: 'Simple & compound interest — formulas, CI−SI shortcut — 15 questions', priority: 'high' },
      { id: 'apt-012', title: 'Permutations & combinations — arrangements, selections, circular, identical items — 20 questions', priority: 'critical' },
      { id: 'apt-013', title: 'Probability — dice, cards, coins, balls, at-least-one — 20 questions', priority: 'critical' },
      { id: 'apt-014', title: 'Mensuration — 2D & 3D formulas sheet + 15 questions', priority: 'medium' },
      { id: 'apt-015', title: 'Progressions — AP, GP, sum formulas — 15 questions', priority: 'medium' },
      { id: 'apt-016', title: 'Speed drill: percentages + P&L + ratio mixed set, 25 questions in 25 minutes', priority: 'high' },
      { id: 'apt-017', title: 'Speed drill: TSD + time & work mixed set, 20 questions in 25 minutes', priority: 'high' },
      { id: 'apt-018', title: 'Speed drill: P&C + probability mixed set, 20 questions in 25 minutes', priority: 'high' },
    ],
    Logical: [
      { id: 'apt-019', title: 'Number & letter series — 25 questions', priority: 'high' },
      { id: 'apt-020', title: 'Coding-decoding — 20 questions', priority: 'high' },
      { id: 'apt-021', title: 'Blood relations — family-tree notation + 15 questions', priority: 'medium' },
      { id: 'apt-022', title: 'Direction sense — 15 questions', priority: 'medium' },
      { id: 'apt-023', title: 'Seating arrangements — linear + circular — 4 sets', priority: 'critical' },
      { id: 'apt-024', title: 'Syllogisms — Venn method, "some/all/no", possibility cases — 20 questions', priority: 'high' },
      { id: 'apt-025', title: 'Statement–conclusion / assumption / course of action — 15 questions', priority: 'medium' },
      { id: 'apt-026', title: 'Puzzles — floor, box, scheduling — 4 sets', priority: 'critical' },
      { id: 'apt-027', title: 'Data sufficiency — 15 questions', priority: 'medium' },
      { id: 'apt-028', title: 'Clocks & calendars — angle formula, odd days — 15 questions', priority: 'medium' },
      { id: 'apt-029', title: 'Speed drill: seating + puzzles, 3 sets in 25 minutes', priority: 'high' },
    ],
    Verbal: [
      { id: 'apt-030', title: 'Reading comprehension — strategy (skim → questions → targeted read) + 3 passages', priority: 'high' },
      { id: 'apt-031', title: 'Reading comprehension — 4 more passages under time', priority: 'medium' },
      { id: 'apt-032', title: 'Para jumbles — opening/closing sentence & link-word tricks — 15 questions', priority: 'high' },
      { id: 'apt-033', title: 'Sentence correction & error spotting — subject-verb, tenses, articles — 25 questions', priority: 'high' },
      { id: 'apt-034', title: 'Vocabulary — synonyms, antonyms, fill-in-the-blanks — 30 questions', priority: 'medium' },
      { id: 'apt-035', title: 'Critical reasoning — strengthen / weaken / assumption — 15 questions', priority: 'medium' },
    ],
    'Data Interpretation': [
      { id: 'apt-036', title: 'DI: tables + bar / line charts — 4 sets', priority: 'high' },
      { id: 'apt-037', title: 'DI: pie charts (percent ↔ degrees) — 3 sets', priority: 'medium' },
      { id: 'apt-038', title: 'DI: caselets (paragraph data) — 3 sets', priority: 'medium' },
      { id: 'apt-039', title: 'DI: mixed-chart sets under time — 3 sets', priority: 'medium' },
    ],
    'Platform patterns': [
      { id: 'apt-040', title: 'AMCAT pattern: sections, adaptive scoring, no negative marking — 1 sectional', priority: 'high', resourceIds: ['r-prepinsta'] },
      { id: 'apt-041', title: 'CoCubes / Aon pattern — 1 sectional', priority: 'medium', resourceIds: ['r-prepinsta'] },
      { id: 'apt-042', title: 'HackerRank OA pattern: MCQ + 2 coding questions, proctoring rules — 1 sample test', priority: 'high', resourceIds: ['r-hackerrank'] },
      { id: 'apt-043', title: 'HirePro pattern — 1 sample test', priority: 'medium' },
      { id: 'apt-044', title: 'Capgemini / Accenture / TCS NQT pattern (game-based + pseudo-code sections) — 1 sample each', priority: 'high', resourceIds: ['r-prepinsta'] },
    ],
    'Full mocks': Array.from({ length: 20 }, (_, i) => ({
      id: `apt-m${String(i + 1).padStart(2, '0')}`,
      title: `Full timed aptitude mock #${i + 1} — then review every wrong answer and log the error type`,
      priority: (i < 10 ? 'high' : 'medium') as 'high' | 'medium',
      resourceIds: ['r-prepinsta', 'r-indiabix'],
    })),
  }),

  // ───────────────────────── 1.3 PySpark & Big Data ─────────────────────────
  ...defineModule('pyspark', 1, {
    Concepts: [
      { id: 'ps-001', title: 'Spark architecture: driver, executors, cluster manager, DAG, jobs → stages → tasks, lazy evaluation', priority: 'critical', resourceIds: ['r-learning-spark'] },
      { id: 'ps-002', title: 'Transformations vs actions; narrow vs wide transformations; why shuffles are expensive', priority: 'high' },
      { id: 'ps-003', title: 'RDD vs DataFrame vs Dataset — what each is and when you’d use it', priority: 'high' },
    ],
    'DataFrame API': [
      { id: 'ps-004', title: 'Set up Databricks Free Edition (or local pyspark) and run a first notebook', priority: 'critical', resourceIds: ['r-databricks-free'] },
      { id: 'ps-005', title: 'SparkSession; read/write CSV, Parquet, JSON; inferSchema vs explicit StructType', priority: 'critical', resourceIds: ['r-spark-docs'] },
      { id: 'ps-006', title: 'select, filter, withColumn, drop, cast, when/otherwise — 10 mini exercises', priority: 'critical', resourceIds: ['r-sparkbyexamples'] },
      { id: 'ps-007', title: 'groupBy + agg, multiple aggregations, pivot', priority: 'high' },
      { id: 'ps-008', title: 'Joins in Spark: types, broadcast joins, sort-merge vs broadcast-hash vs shuffle-hash', priority: 'critical' },
      { id: 'ps-009', title: 'Window functions in PySpark: Window.partitionBy().orderBy(), rank, lag, running totals', priority: 'high' },
      { id: 'ps-010', title: 'Port 5 SQL interview patterns to PySpark (top-N per group, MoM growth, dedupe, streaks, cohort)', priority: 'critical' },
      { id: 'ps-011', title: 'Spark SQL: temp views, mixing SQL with the DataFrame API', priority: 'high' },
      { id: 'ps-012', title: 'UDFs and why to avoid them; pandas (vectorised) UDFs', priority: 'medium' },
    ],
    Performance: [
      { id: 'ps-013', title: 'Partitioning: repartition vs coalesce, partitionBy on write, spark.sql.shuffle.partitions', priority: 'high' },
      { id: 'ps-014', title: 'Caching & persistence: cache vs persist, storage levels, when to unpersist', priority: 'medium' },
      { id: 'ps-015', title: 'Tuning basics: AQE, data skew (salting), broadcast threshold, small files; read the Spark UI', priority: 'high', resourceIds: ['r-spark-tuning'] },
      { id: 'ps-016', title: 'Delta Lake: ACID, time travel, schema evolution, MERGE upserts', priority: 'high', resourceIds: ['r-delta-docs'] },
      { id: 'ps-017', title: 'Interview drill: answer the Spark questions in the Interview bank out loud', priority: 'high' },
    ],
    'Deliverable project': [
      { id: 'ps-018', title: 'Project scope: port the Outright preprocessing pipeline OR Faculty Review Analytics; README skeleton', priority: 'critical' },
      { id: 'ps-019', title: 'Project: ingest raw data → bronze Delta table (explicit schema, bad-record handling)', priority: 'critical' },
      { id: 'ps-020', title: 'Project: clean + transform → silver (joins, window functions, dedupe)', priority: 'critical' },
      { id: 'ps-021', title: 'Project: aggregate → gold marts; benchmark runtime vs the original pandas version', priority: 'high' },
      { id: 'ps-022', title: 'Project: tuning pass — partitioning, broadcast, caching; Spark UI screenshots before/after', priority: 'high' },
      { id: 'ps-023', title: 'Project: README (architecture diagram, results, how to run) and push to GitHub', priority: 'critical' },
      { id: 'ps-024', title: 'Add PySpark · Databricks · Delta Lake to DS / Analyst resumes + LinkedIn skills — now honestly claimable', priority: 'high' },
    ],
  }),

  // ───────────────────────── 1.4 DBMS ─────────────────────────
  ...defineModule('dbms', 1, {
    Modelling: [
      { id: 'db-001', title: 'ER model: entities, attribute types, relationships, cardinality, participation — draw Confer’s ER', priority: 'high' },
      { id: 'db-002', title: 'Relational model & keys: super, candidate, primary, foreign, composite, alternate', priority: 'critical' },
      { id: 'db-003', title: 'Functional dependencies, attribute closure, finding candidate keys — solve 5', priority: 'high' },
      { id: 'db-004', title: 'Normalisation 1NF → 2NF → 3NF → BCNF on one worked example; 4NF / MVD concept', priority: 'critical' },
      { id: 'db-005', title: 'Lossless-join & dependency-preserving decomposition; denormalisation and when to use it', priority: 'medium' },
    ],
    Transactions: [
      { id: 'db-006', title: 'ACID in depth — how databases implement each (WAL / logs, locks, constraints, durability)', priority: 'critical' },
      { id: 'db-007', title: 'Schedules: serial vs serialisable; conflict vs view serialisability (precedence graph)', priority: 'high' },
      { id: 'db-008', title: 'Concurrency control: shared/exclusive locks, 2PL (strict, rigorous), timestamp ordering', priority: 'high' },
      { id: 'db-009', title: 'DB deadlocks: wait-for graph, wait-die vs wound-wait, detection', priority: 'medium' },
      { id: 'db-010', title: 'Isolation levels vs anomalies (dirty / non-repeatable / phantom reads) — table from memory', priority: 'critical' },
    ],
    'Storage & indexing': [
      { id: 'db-011', title: 'Indexing: B-tree vs B+ tree, hashing, clustered vs non-clustered, dense vs sparse', priority: 'critical' },
      { id: 'db-012', title: 'Query processing & optimisation: parse → relational algebra → cost-based plan; join algorithms', priority: 'medium' },
      { id: 'db-013', title: 'Storage & file organisation: heap, sorted, hashed files; pages and blocks', priority: 'low' },
    ],
    NoSQL: [
      { id: 'db-014', title: 'SQL vs NoSQL, CAP theorem, NoSQL families (document, key-value, wide-column, graph)', priority: 'high' },
      { id: 'db-015', title: 'MongoDB: embed vs reference, aggregation pipeline, indexes — explain with Confer’s schema', priority: 'high', resourceIds: ['r-mongo-agg'] },
    ],
    'Self-test': [
      { id: 'db-016', title: 'Answer 20 DBMS interview questions out loud (Interview bank → Core CS), then revise gaps', priority: 'critical' },
    ],
  }),

  // ───────────────────────── 1.5 Operating Systems ─────────────────────────
  ...defineModule('os', 1, {
    Processes: [
      { id: 'os-001', title: 'Process vs thread, PCB, process state diagram, context switching', priority: 'critical' },
      { id: 'os-002', title: 'System calls, user vs kernel mode, fork / exec basics', priority: 'medium' },
      { id: 'os-003', title: 'CPU scheduling: FCFS, SJF, SRTF, Priority, Round Robin, MLFQ — criteria & trade-offs', priority: 'critical' },
      { id: 'os-004', title: 'Scheduling numericals — solve 6 (Gantt chart, waiting & turnaround time)', priority: 'high' },
    ],
    Synchronisation: [
      { id: 'os-005', title: 'Critical section, race conditions, Peterson’s solution, mutex vs semaphore vs monitor', priority: 'critical' },
      { id: 'os-006', title: 'Producer-consumer, readers-writers, dining philosophers — pseudocode for each', priority: 'high' },
      { id: 'os-007', title: 'Deadlock: Coffman conditions; prevention vs avoidance vs detection vs recovery', priority: 'critical' },
      { id: 'os-008', title: 'Banker’s algorithm — solve 2 numericals', priority: 'high' },
    ],
    Memory: [
      { id: 'os-009', title: 'Contiguous allocation, fragmentation, paging, segmentation, TLB', priority: 'critical' },
      { id: 'os-010', title: 'Virtual memory, demand paging, page faults, thrashing, working set', priority: 'high' },
      { id: 'os-011', title: 'Page replacement FIFO / LRU / Optimal + Belady’s anomaly — solve 4 numericals', priority: 'high' },
    ],
    'Files, disks, IPC': [
      { id: 'os-012', title: 'File systems: directory structures, contiguous / linked / indexed allocation, inodes', priority: 'medium' },
      { id: 'os-013', title: 'Disk scheduling FCFS, SSTF, SCAN, C-SCAN, LOOK — solve 3', priority: 'medium' },
      { id: 'os-014', title: 'I/O management + IPC: pipes, message queues, shared memory, sockets, signals', priority: 'medium' },
    ],
    'Self-test': [
      { id: 'os-015', title: 'Answer 20 OS interview questions out loud (Interview bank → Core CS), then revise gaps', priority: 'critical' },
    ],
  }),

  // ───────────────────────── 1.6 Computer Networks ─────────────────────────
  ...defineModule('cn', 1, {
    Models: [
      { id: 'cn-001', title: 'OSI model: all 7 layers, what lives where, PDUs and devices per layer', priority: 'critical' },
      { id: 'cn-002', title: 'TCP/IP model and its mapping to OSI', priority: 'high' },
      { id: 'cn-003', title: 'Data link: framing, parity / CRC / checksum, MAC addresses, switches, ARP', priority: 'medium' },
    ],
    'Network layer': [
      { id: 'cn-004', title: 'IPv4 vs IPv6, classful vs CIDR, private ranges, NAT', priority: 'critical' },
      { id: 'cn-005', title: 'Subnetting — solve 10 (mask, hosts, network & broadcast address)', priority: 'high', resourceIds: ['r-subnet-practice'] },
      { id: 'cn-006', title: 'Routing: static vs dynamic, distance vector (RIP) vs link state (OSPF), BGP basics', priority: 'medium' },
    ],
    Transport: [
      { id: 'cn-007', title: 'TCP vs UDP in detail; 3-way handshake, 4-way teardown, TIME_WAIT', priority: 'critical' },
      { id: 'cn-008', title: 'Flow control (sliding window) vs congestion control (slow start, AIMD, fast retransmit)', priority: 'high' },
    ],
    Application: [
      { id: 'cn-009', title: 'HTTP/HTTPS: methods, idempotency, status codes, headers, cookies; HTTP/1.1 vs 2 vs 3', priority: 'critical' },
      { id: 'cn-010', title: 'REST principles + "what happens when you type a URL" — full walkthrough out loud', priority: 'critical' },
      { id: 'cn-011', title: 'DNS resolution (recursive / iterative, record types, TTL), DHCP (DORA), SMTP, FTP', priority: 'high', resourceIds: ['r-cloudflare-learning'] },
      { id: 'cn-012', title: 'TLS handshake, certificates & CAs, symmetric vs asymmetric crypto — how HTTPS works', priority: 'high', resourceIds: ['r-cloudflare-learning'] },
      { id: 'cn-013', title: 'Sockets & ports; well-known ports list (22, 53, 80, 443, 3306, 5432, 6379, 27017)', priority: 'medium' },
      { id: 'cn-014', title: 'Network security basics: firewalls, DDoS, MITM, XSS / CSRF / SQL injection, VPN', priority: 'medium' },
    ],
    'Self-test': [
      { id: 'cn-015', title: 'Answer 20 CN interview questions out loud (Interview bank → Core CS), then revise gaps', priority: 'critical' },
    ],
  }),

  // ───────────────────────── 1.7 OOP (Java) ─────────────────────────
  ...defineModule('oop', 1, {
    Pillars: [
      { id: 'oop-001', title: 'Four pillars with Java examples — write a small hierarchy (Account → Savings / Current)', priority: 'critical' },
      { id: 'oop-002', title: 'Compile-time vs runtime polymorphism; overloading vs overriding rules', priority: 'critical' },
      { id: 'oop-003', title: 'Abstract classes vs interfaces (default / static methods) — when to use which', priority: 'critical' },
      { id: 'oop-004', title: 'Types of inheritance; the diamond problem and how Java handles it', priority: 'high' },
      { id: 'oop-005', title: 'Composition vs inheritance — refactor one inheritance example into composition', priority: 'medium' },
    ],
    'Java mechanics': [
      { id: 'oop-006', title: 'Access modifiers, incl. package-private and protected subtleties', priority: 'medium' },
      { id: 'oop-007', title: 'static vs instance members, static blocks, initialisation order', priority: 'medium' },
      { id: 'oop-008', title: 'Constructors, chaining with this() / super(), copy constructors; this vs super', priority: 'high' },
      { id: 'oop-009', title: 'Object methods: equals / hashCode contract, toString, clone (shallow vs deep)', priority: 'critical' },
      { id: 'oop-010', title: 'Immutability and final (class / method / variable); String immutability and the string pool', priority: 'high' },
      { id: 'oop-011', title: 'Exceptions: hierarchy, checked vs unchecked, custom exceptions, try-with-resources, finally gotchas', priority: 'high' },
    ],
    'Collections & generics': [
      { id: 'oop-012', title: 'Collections: List / Set / Map / Queue implementations + complexities; when to use each', priority: 'critical' },
      { id: 'oop-013', title: 'HashMap internals: hashing, buckets, load factor, resize, treeification; ConcurrentHashMap in one line', priority: 'high' },
      { id: 'oop-014', title: 'Generics: bounded types, wildcards (? extends / ? super), type erasure', priority: 'medium' },
      { id: 'oop-015', title: 'Java for DSA: fast I/O, arrays, StringBuilder, Comparator lambdas, PriorityQueue, ArrayDeque', priority: 'critical' },
    ],
    Design: [
      { id: 'oop-016', title: 'SOLID principles — one Java example each', priority: 'high', resourceIds: ['r-refactoring-guru'] },
      { id: 'oop-017', title: 'Patterns: Singleton (thread-safe), Factory, Builder', priority: 'high', resourceIds: ['r-refactoring-guru'] },
      { id: 'oop-018', title: 'Patterns: Observer, Strategy, Decorator', priority: 'high', resourceIds: ['r-refactoring-guru'] },
    ],
    'Self-test': [
      { id: 'oop-019', title: 'Answer 20 OOP / Java interview questions out loud (Interview bank → Core CS), then revise gaps', priority: 'critical' },
    ],
  }),
];
