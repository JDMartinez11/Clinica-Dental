export const environment = {
  production: false,
  supabaseUrl: process.env['NG_APP_SUPABASE_URL'] || 'https://pwlzksypsbxbnqyuffbw.supabase.co',
  supabaseAnonKey: process.env['NG_APP_SUPABASE_ANON_KEY'] || ''
};
