# تطبيق قائمة المهام المدعوم بالذكاء الاصطناعي (AI-Powered ToDo App)

تطبيق قائمة مهام متعدد المستخدمين مع تحليلات مدعومة بالذكاء الاصطناعي. يمكن للمستخدمين إضافة المهام، وتحديد أحجامها، وتتبع حالة الإنجاز وكسب النقاط.

## المميزات

- دعم للمستخدمين المتعددين مع صور شخصية
- نظام النقاط بناءً على حجم المهمة
- تحليلات للإنتاجية وتوصيات
- دعم اللغة العربية والإنجليزية
- وضع الظلام ووضع النهار
- واجهة مستخدم جميلة وسهلة الاستخدام

## التقنيات المستخدمة

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (إدارة الحالة)
- Supabase (قاعدة البيانات)

## الإعداد مع Supabase

1. أنشئ حسابًا على [Supabase](https://supabase.com) وأنشئ مشروعًا جديدًا
2. انسخ `SUPABASE_URL` و `SUPABASE_ANON_KEY` من إعدادات مشروعك
3. أنشئ ملف `.env.local` في المجلد الجذر وأضف المتغيرات البيئية:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. انتقل إلى SQL Editor في Supabase وانسخ محتويات `supabase/schema.sql` لإنشاء جداول قاعدة البيانات

## تشغيل المشروع محليًا

1. استنساخ المستودع
   ```bash
   git clone https://github.com/ASD-Upper/Todo_3.git
   cd Todo_3
   ```

2. تثبيت الاعتمادات
   ```bash
   npm install
   ```

3. تشغيل خادم التطوير
   ```bash
   npm run dev
   ```

4. افتح [http://localhost:3000](http://localhost:3000) في متصفحك

## النشر على Vercel

1. انشر هذا المشروع على Vercel
2. أضف متغيرات البيئة في إعدادات Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## النشر على Supabase

- نفذ ملف SQL الموجود في `supabase/schema.sql` في محرر SQL في Supabase

## المساهمة

المساهمات مرحب بها! يرجى إرسال طلبات السحب للميزات أو إصلاحات الأخطاء.

## Project Structure

- `src/app`: Main application routes
  - `/(users)`: Individual user pages
  - `/dashboard`: Dashboard showing all users
- `src/components`: Reusable UI components
- `src/lib`: Utility functions, types, and services
  - `ai-service.ts`: Integration with Google Gemini AI
  - `store.ts`: Zustand store for state management
  - `types.ts`: TypeScript type definitions
  - `utils.ts`: Utility functions

## Task Sizes and Points

- Small: 1 point
- Medium: 3 points
- Large: 5 points

Points are awarded upon task completion and used for productivity analysis.

## AI Analysis

The application uses Google Gemini AI to analyze user productivity data and provide:

1. A personalized analysis of productivity
2. Specific recommendations for improvement
3. Performance rating (excellent, good, average, needs-improvement)

## License

MIT
