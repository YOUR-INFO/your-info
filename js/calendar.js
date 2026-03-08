import { supabase } from './supabase.js';

export async function getCalendarEvents(userId) {
  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('user_id', userId)
    .order('event_date', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getUpcomingEvents(userId, days = 7) {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);

  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('user_id', userId)
    .eq('is_completed', false)
    .gte('event_date', today.toISOString())
    .lte('event_date', futureDate.toISOString())
    .order('event_date', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function addCalendarEvent(userId, event) {
  const { data, error } = await supabase
    .from('calendar_events')
    .insert({
      user_id: userId,
      title: event.title,
      description: event.description || '',
      event_date: event.event_date,
      remind_before_days: event.remind_before_days || 1,
      color: event.color || '#3B82F6',
      is_completed: false
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCalendarEvent(eventId, event) {
  const { data, error } = await supabase
    .from('calendar_events')
    .update({
      ...event,
      updated_at: new Date().toISOString()
    })
    .eq('id', eventId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCalendarEvent(eventId) {
  const { error } = await supabase
    .from('calendar_events')
    .delete()
    .eq('id', eventId);

  if (error) throw error;
}

export async function toggleEventComplete(eventId, isCompleted) {
  const { data, error } = await supabase
    .from('calendar_events')
    .update({ is_completed: isCompleted })
    .eq('id', eventId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
