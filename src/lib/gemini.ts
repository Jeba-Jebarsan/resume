import { supabase } from "@/integrations/supabase/client";

export const generateImprovedContent = async (content: string, type: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('enhance-content', {
      body: { content, type }
    });

    if (error) throw error;
    if (!data?.improved) throw new Error('No improvement generated');
    
    return data.improved;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};