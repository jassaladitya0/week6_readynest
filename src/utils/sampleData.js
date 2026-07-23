// Preloaded realistic rich datasets for testing and initial exploration

export const SAMPLE_DATASETS = [
  {
    id: 'ecommerce',
    name: 'Global E-Commerce Sales',
    category: 'Retail & Sales',
    description: '100+ global order records with regional sales, profit margins, product categories, discounts, customer ratings, and churn indicators.',
    icon: 'ShoppingBag',
    data: [
      { OrderID: 'ORD-1001', Date: '2024-01-05', Region: 'North America', Category: 'Electronics', SubCategory: 'Laptops', Sales: 1299.99, Profit: 320.50, Units: 1, Discount: 0.05, Rating: 4.8, Segment: 'Enterprise', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1002', Date: '2024-01-06', Region: 'Europe', Category: 'Furniture', SubCategory: 'Chairs', Sales: 450.00, Profit: 85.00, Units: 3, Discount: 0.10, Rating: 4.2, Segment: 'Consumer', ChurnRisk: 'Medium' },
      { OrderID: 'ORD-1003', Date: '2024-01-08', Region: 'Asia Pacific', Category: 'Electronics', SubCategory: 'Smartphones', Sales: 899.50, Profit: 210.00, Units: 2, Discount: 0.00, Rating: 4.9, Segment: 'Consumer', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1004', Date: '2024-01-10', Region: 'Latin America', Category: 'Office Supplies', SubCategory: 'Paper', Sales: 120.25, Profit: 35.10, Units: 10, Discount: 0.15, Rating: 3.9, Segment: 'SMB', ChurnRisk: 'High' },
      { OrderID: 'ORD-1005', Date: '2024-01-12', Region: 'North America', Category: 'Electronics', SubCategory: 'Headphones', Sales: 249.99, Profit: 95.00, Units: 2, Discount: 0.00, Rating: 4.6, Segment: 'Enterprise', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1006', Date: '2024-01-15', Region: 'Europe', Category: 'Furniture', SubCategory: 'Tables', Sales: 780.00, Profit: 140.00, Units: 1, Discount: 0.20, Rating: 4.1, Segment: 'Consumer', ChurnRisk: 'Medium' },
      { OrderID: 'ORD-1007', Date: '2024-01-18', Region: 'Asia Pacific', Category: 'Electronics', SubCategory: 'Laptops', Sales: 1540.00, Profit: 410.00, Units: 2, Discount: 0.05, Rating: 4.7, Segment: 'Enterprise', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1008', Date: '2024-01-20', Region: 'North America', Category: 'Office Supplies', SubCategory: 'Binders', Sales: 65.40, Profit: 18.20, Units: 5, Discount: 0.10, Rating: 3.8, Segment: 'SMB', ChurnRisk: 'Medium' },
      { OrderID: 'ORD-1009', Date: '2024-01-22', Region: 'Europe', Category: 'Electronics', SubCategory: 'Smartphones', Sales: 1199.00, Profit: 310.00, Units: 1, Discount: 0.00, Rating: 4.8, Segment: 'Consumer', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1010', Date: '2024-01-25', Region: 'Latin America', Category: 'Furniture', SubCategory: 'Chairs', Sales: 310.00, Profit: -15.00, Units: 2, Discount: 0.25, Rating: 3.2, Segment: 'Consumer', ChurnRisk: 'High' },
      { OrderID: 'ORD-1011', Date: '2024-02-01', Region: 'North America', Category: 'Electronics', SubCategory: 'Smartphones', Sales: 999.00, Profit: 250.00, Units: 1, Discount: 0.05, Rating: 4.5, Segment: 'Consumer', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1012', Date: '2024-02-03', Region: 'Europe', Category: 'Office Supplies', SubCategory: 'Storage', Sales: 210.50, Profit: 55.00, Units: 4, Discount: 0.10, Rating: 4.3, Segment: 'SMB', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1013', Date: '2024-02-05', Region: 'Asia Pacific', Category: 'Furniture', SubCategory: 'Tables', Sales: 1120.00, Profit: 210.00, Units: 2, Discount: 0.15, Rating: 4.0, Segment: 'Enterprise', ChurnRisk: 'Medium' },
      { OrderID: 'ORD-1014', Date: '2024-02-08', Region: 'Latin America', Category: 'Electronics', SubCategory: 'Headphones', Sales: 180.00, Profit: 45.00, Units: 1, Discount: 0.00, Rating: 4.2, Segment: 'Consumer', ChurnRisk: 'Medium' },
      { OrderID: 'ORD-1015', Date: '2024-02-12', Region: 'North America', Category: 'Furniture', SubCategory: 'Chairs', Sales: 580.00, Profit: 115.00, Units: 4, Discount: 0.10, Rating: 4.4, Segment: 'Enterprise', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1016', Date: '2024-02-15', Region: 'Europe', Category: 'Electronics', SubCategory: 'Laptops', Sales: 1850.00, Profit: 490.00, Units: 2, Discount: 0.00, Rating: 4.9, Segment: 'Enterprise', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1017', Date: '2024-02-18', Region: 'Asia Pacific', Category: 'Office Supplies', SubCategory: 'Paper', Sales: 95.00, Profit: 28.00, Units: 8, Discount: 0.05, Rating: 4.1, Segment: 'SMB', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1018', Date: '2024-02-22', Region: 'North America', Category: 'Electronics', SubCategory: 'Smartphones', Sales: 1050.00, Profit: 270.00, Units: 1, Discount: 0.00, Rating: 4.7, Segment: 'Consumer', ChurnRisk: 'Low' },
      { OrderID: 'ORD-1019', Date: '2024-02-25', Region: 'Latin America', Category: 'Office Supplies', SubCategory: 'Binders', Sales: 45.00, Profit: 8.50, Units: 3, Discount: 0.20, Rating: 3.5, Segment: 'Consumer', ChurnRisk: 'High' },
      { OrderID: 'ORD-1020', Date: '2024-02-28', Region: 'Europe', Category: 'Furniture', SubCategory: 'Tables', Sales: 940.00, Profit: 180.00, Units: 1, Discount: 0.10, Rating: 4.3, Segment: 'Enterprise', ChurnRisk: 'Low' }
    ]
  },
  {
    id: 'saas',
    name: 'SaaS Metrics & Growth Analytics',
    category: 'Finance & SaaS',
    description: 'Monthly SaaS recurring revenue (MRR), Churn Rate, Customer Acquisition Cost (CAC), Lifetime Value (LTV), and NPS score benchmarks.',
    icon: 'TrendingUp',
    data: [
      { Month: '2023-01', MRR: 45000, NewSignups: 420, ChurnRate: 3.2, CAC: 240, LTV: 1850, ActiveUsers: 3400, SupportTickets: 120, NPS: 42 },
      { Month: '2023-02', MRR: 48500, NewSignups: 460, ChurnRate: 2.9, CAC: 230, LTV: 1920, ActiveUsers: 3750, SupportTickets: 115, NPS: 45 },
      { Month: '2023-03', MRR: 53000, NewSignups: 510, ChurnRate: 2.7, CAC: 220, LTV: 2010, ActiveUsers: 4180, SupportTickets: 135, NPS: 48 },
      { Month: '2023-04', MRR: 58200, NewSignups: 550, ChurnRate: 2.5, CAC: 215, LTV: 2100, ActiveUsers: 4620, SupportTickets: 140, NPS: 50 },
      { Month: '2023-05', MRR: 62800, NewSignups: 590, ChurnRate: 2.6, CAC: 210, LTV: 2150, ActiveUsers: 5100, SupportTickets: 155, NPS: 49 },
      { Month: '2023-06', MRR: 69000, NewSignups: 640, ChurnRate: 2.3, CAC: 205, LTV: 2280, ActiveUsers: 5650, SupportTickets: 160, NPS: 53 },
      { Month: '2023-07', MRR: 74500, NewSignups: 690, ChurnRate: 2.1, CAC: 198, LTV: 2390, ActiveUsers: 6200, SupportTickets: 172, NPS: 56 },
      { Month: '2023-08', MRR: 81000, NewSignups: 740, ChurnRate: 2.0, CAC: 195, LTV: 2500, ActiveUsers: 6850, SupportTickets: 180, NPS: 58 },
      { Month: '2023-09', MRR: 88400, NewSignups: 810, ChurnRate: 1.8, CAC: 188, LTV: 2650, ActiveUsers: 7500, SupportTickets: 195, NPS: 61 },
      { Month: '2023-10', MRR: 96000, NewSignups: 870, ChurnRate: 1.7, CAC: 182, LTV: 2780, ActiveUsers: 8250, SupportTickets: 210, NPS: 63 },
      { Month: '2023-11', MRR: 104500, NewSignups: 940, ChurnRate: 1.6, CAC: 175, LTV: 2910, ActiveUsers: 9100, SupportTickets: 220, NPS: 65 },
      { Month: '2023-12', MRR: 115000, NewSignups: 1050, ChurnRate: 1.4, CAC: 168, LTV: 3100, ActiveUsers: 10200, SupportTickets: 240, NPS: 68 }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Clinical Patient Index',
    category: 'Medical & Biology',
    description: 'Patient vital stats, BMI, Cholesterol, Blood Pressure, Glucose levels, treatment cost, and health risk index.',
    icon: 'Activity',
    data: [
      { PatientID: 'P-501', Age: 45, Gender: 'Female', BMI: 24.5, SystolicBP: 120, Cholesterol: 195, Glucose: 92, DaysInHospital: 2, TreatmentCost: 3400, HealthRisk: 'Low' },
      { PatientID: 'P-502', Age: 62, Gender: 'Male', BMI: 29.8, SystolicBP: 145, Cholesterol: 240, Glucose: 135, DaysInHospital: 7, TreatmentCost: 12800, HealthRisk: 'High' },
      { PatientID: 'P-503', Age: 34, Gender: 'Female', BMI: 21.2, SystolicBP: 115, Cholesterol: 175, Glucose: 85, DaysInHospital: 1, TreatmentCost: 1800, HealthRisk: 'Low' },
      { PatientID: 'P-504', Age: 58, Gender: 'Male', BMI: 31.4, SystolicBP: 138, Cholesterol: 225, Glucose: 118, DaysInHospital: 5, TreatmentCost: 8900, HealthRisk: 'Moderate' },
      { PatientID: 'P-505', Age: 71, Gender: 'Female', BMI: 27.6, SystolicBP: 152, Cholesterol: 255, Glucose: 142, DaysInHospital: 9, TreatmentCost: 16500, HealthRisk: 'High' },
      { PatientID: 'P-506', Age: 29, Gender: 'Male', BMI: 23.0, SystolicBP: 118, Cholesterol: 182, Glucose: 88, DaysInHospital: 1, TreatmentCost: 1500, HealthRisk: 'Low' },
      { PatientID: 'P-507', Age: 51, Gender: 'Female', BMI: 28.1, SystolicBP: 132, Cholesterol: 210, Glucose: 105, DaysInHospital: 4, TreatmentCost: 6200, HealthRisk: 'Moderate' },
      { PatientID: 'P-508', Age: 67, Gender: 'Male', BMI: 33.5, SystolicBP: 160, Cholesterol: 270, Glucose: 160, DaysInHospital: 12, TreatmentCost: 24000, HealthRisk: 'Critical' },
      { PatientID: 'P-509', Age: 42, Gender: 'Female', BMI: 25.2, SystolicBP: 124, Cholesterol: 190, Glucose: 95, DaysInHospital: 2, TreatmentCost: 3100, HealthRisk: 'Low' },
      { PatientID: 'P-510', Age: 55, Gender: 'Male', BMI: 26.9, SystolicBP: 130, Cholesterol: 215, Glucose: 110, DaysInHospital: 3, TreatmentCost: 5400, HealthRisk: 'Moderate' }
    ]
  },
  {
    id: 'ai_models',
    name: 'AI Model Benchmark & Performance Evaluation',
    category: 'Technology & AI',
    description: 'Evaluation metrics for LLMs & Computer Vision models: Accuracy, Latency, Parameter Count, GPU VRAM, Cost per 1M tokens.',
    icon: 'Cpu',
    data: [
      { Model: 'GPT-4o', Developer: 'OpenAI', Accuracy: 88.6, Latency_ms: 450, Params_B: 1800, VRAM_GB: 160, CostPer1M: 5.00, Category: 'Multimodal LLM' },
      { Model: 'Claude 3.5 Sonnet', Developer: 'Anthropic', Accuracy: 89.2, Latency_ms: 380, Params_B: 700, VRAM_GB: 80, CostPer1M: 3.00, Category: 'Multimodal LLM' },
      { Model: 'Gemini 1.5 Pro', Developer: 'Google', Accuracy: 87.8, Latency_ms: 410, Params_B: 1000, VRAM_GB: 120, CostPer1M: 3.50, Category: 'Multimodal LLM' },
      { Model: 'Llama 3.1 70B', Developer: 'Meta', Accuracy: 82.4, Latency_ms: 210, Params_B: 70, VRAM_GB: 40, CostPer1M: 0.90, Category: 'Open Source LLM' },
      { Model: 'Llama 3.1 405B', Developer: 'Meta', Accuracy: 87.3, Latency_ms: 620, Params_B: 405, VRAM_GB: 240, CostPer1M: 2.80, Category: 'Open Source LLM' },
      { Model: 'Mistral Large 2', Developer: 'Mistral AI', Accuracy: 84.0, Latency_ms: 290, Params_B: 123, VRAM_GB: 64, CostPer1M: 2.00, Category: 'Open Source LLM' },
      { Model: 'DeepSeek V2.5', Developer: 'DeepSeek', Accuracy: 85.1, Latency_ms: 320, Params_B: 236, VRAM_GB: 80, CostPer1M: 0.28, Category: 'Open Source LLM' },
      { Model: 'Qwen 2.5 72B', Developer: 'Alibaba', Accuracy: 86.1, Latency_ms: 250, Params_B: 72, VRAM_GB: 48, CostPer1M: 0.40, Category: 'Open Source LLM' }
    ]
  }
];
