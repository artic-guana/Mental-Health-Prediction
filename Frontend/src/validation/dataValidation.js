import { z } from "zod";

export const predictionSchema = z.object({
  age: z.number().int().min(10).max(100),

  gender: z.enum(["Male", "Female"]),

  country: z.string().min(1, "Country is required"),

  academic_level: z.enum([
    "Undergraduate",
    "Graduate",
    "High School",
  ]),

  most_used_platform: z.enum([
    "Facebook",
    "LinkedIn",
    "Instagram",
    "Snapchat",
    "Twitter",
    "YouTube",
    "TikTok",
    "LINE",
    "KakaoTalk",
    "VKontakte",
    "WhatsApp",
    "WeChat",
  ]),

  purpose_of_use: z.enum([
    "Networking",
    "Education",
    "Entertainment",
    "News",
  ]),

  avg_daily_usage_hours: z.number().min(0).max(24),

  daily_unlocks: z.number().int().min(0),

  study_hours: z.number().min(0).max(24),

  physical_activity_hours: z.number().min(0).max(24),

  sleep_hours_per_night: z.number().min(0).max(24),

  stress_level: z.enum([
    "Low",
    "Medium",
    "High",
    "Very High",
  ]),
});