export interface PortfolioData {
    hero_title: string;
    hero_subtitle: string;
    hero_description: string;
    about_text: string;
    profile_image: string; // RFC 2397 data URL
    contact_email: string;
    github_url: string;
    linkedin_url: string;
    twitter_url: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    tech_stack: string[];
    image_data: string | null;
    link: string | null;
    featured: boolean;
    created_at: string;
    updated_at: string;
}

// Helper to get D1 database in Astro endpoints
export function getDB(context: any) {
    return context.locals?.runtime?.env?.DB || (context as any).env?.DB;
}