import { supabase } from './supabase.js';

export async function getAchievements(userId) {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addAchievement(userId, achievement) {
  const { data, error } = await supabase
    .from('achievements')
    .insert({
      user_id: userId,
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      category: achievement.category || 'general',
      image_url: achievement.image_url || ''
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAchievement(achievementId, achievement) {
  const { data, error } = await supabase
    .from('achievements')
    .update({
      ...achievement,
      updated_at: new Date().toISOString()
    })
    .eq('id', achievementId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAchievement(achievementId) {
  const { error } = await supabase
    .from('achievements')
    .delete()
    .eq('id', achievementId);

  if (error) throw error;
}
