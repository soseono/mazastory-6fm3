import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY);

// Test exact same query maza-blog uses
const domain = process.env.PUBLIC_SITE_DOMAIN;
console.log("Testing domain:", domain);

const { data, error } = await supabase
  .from('posts')
  .select('id, title, metadata, sites!inner(domain)')
  .in('status', ['published', 'approved', 'ready_to_publish'])
  .eq('sites.domain', domain)
  .order('created_at', { ascending: false })
  .limit(3);

console.log("Posts found:", data?.length);
if (error) console.log("Error:", error.message);
data?.forEach(p => {
  console.log('- ', p.title.substring(0,40), '| image:', p.metadata?.data?.image1 ? '✅' : '❌없음');
});
