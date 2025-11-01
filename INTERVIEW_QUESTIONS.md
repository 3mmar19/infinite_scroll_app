# 🎤 أسئلة المقابلة - Infinite Scroll Assignment

دليل شامل للأسئلة المتوقعة في المقابلات مع إجابات تفصيلية بلهجة سعودية/خليجية بسيطة.

---

## 📚 فهرس المحتويات

1. [Core Features](#القسم-الأول-core-features)
2. [React Query](#القسم-الثاني-react-query)
3. [TypeScript](#القسم-الثالث-typescript)
4. [MSW](#القسم-الرابع-msw)
5. [UI/UX](#القسم-الخامس-uiux)
6. [Bonus Features](#القسم-السادس-bonus-features)
7. [Architecture](#القسم-السابع-architecture)
8. [Problem Solving](#القسم-الثامن-problem-solving)

---

# القسم الأول: Core Features

## ❓ س1: شرح لي كيف سويت الـ Infinite Scroll؟

**الجواب:**

استخدمت مكتبة `react-intersection-observer` عشان أسوي infinite scroll بطريقة نظيفة.

**الفكرة:**
- حطيت عنصر اسمه sentinel في آخر القائمة
- لما المستخدم يوصل للـ sentinel، أجيب الصفحة الجاية
- استخدمت `useInView` hook

**الكود:**
```typescript
const { ref, inView } = useInView({ threshold: 0 });

useEffect(() => {
  if (inView && hasNextPage && !isFetchingNextPage && !isError) {
    fetchNextPage();
  }
}, [inView, hasNextPage, isFetchingNextPage, isError, fetchNextPage]);
```

**الشروط الأربعة:**
1. `inView` - الـ sentinel ظاهر
2. `hasNextPage` - في صفحات باقية
3. `!isFetchingNextPage` - مو بنحمل دحين
4. `!isError` - ما في error

---

## ❓ س2: ليش استخدمت مكتبة بدال IntersectionObserver يدوي؟

**الجواب:**

المكتبة أبسط بكثير:

**يدوي:** ~20 سطر code مع setup و cleanup
**المكتبة:** 4 أسطر بس

**الفوايد:**
- الكود أقصر وأوضح
- المكتبة تهتم بالـ cleanup
- أسهل في الـ testing
- مجربة من ناس كثير

---

## ❓ س3: كيف تحسب الـ Pagination؟

**الجواب:**

**المعادلة:**
```typescript
const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;
const items = products.slice(startIndex, endIndex);
```

**مثال (Page 2, limit 20):**
```
startIndex = (2-1) * 20 = 20
endIndex = 20 + 20 = 40
slice(20, 40) → items [20-39]
```

**حساب hasMore:**
```typescript
hasMore: endIndex < total
```

---

## ❓ س4: شرح لي الـ Mock API مع MSW؟

**الجواب:**

MSW تسوي fake backend يشتغل زي real API:

```typescript
http.get('/api/items', async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  
  // حساب pagination
  const startIndex = (page - 1) * 20;
  const items = products.slice(startIndex, startIndex + 20);
  
  // تأخير واقعي
  await delay(Math.random() * 700 + 300);
  
  return HttpResponse.json({
    items,
    page,
    hasMore: startIndex + 20 < products.length
  });
});
```

**الفوايد:**
- يشتغل في الـ browser
- ما يحتاج backend حقيقي
- تأخير واقعي (300-1000ms)

---

# القسم الثاني: React Query

## ❓ س5: ليش استخدمت React Query؟

**الجواب:**

React Query تحل مشاكل كثيرة:

**بدونها:**
- إدارة state يدوياً
- دمج الصفحات يدوياً
- ما في caching
- ما في retry

**معها:**
```typescript
const { data, fetchNextPage } = useInfiniteQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});
```

**الفوايد:**
- Automatic caching
- Background refetching
- Loading states
- Error handling
- Retry logic
- كود أقل بكثير

---

## ❓ س6: الفرق بين staleTime و gcTime؟

**الجواب:**

**staleTime (5 دقائق):** البيانات fresh لمدة 5 دقائق
- لو رجعت قبل 5 دقائق: استخدم cache، ما في API call

**gcTime (10 دقائق):** البيانات تبقى في memory لمدة 10 دقائق
- بعد 10 دقائق: الـ cache ينمسح

**الجدول:**
| الوقت | staleTime | gcTime | النتيجة |
|-------|-----------|--------|---------|
| 0-5 دقائق | Fresh | في Cache | استخدم cache |
| 5-10 دقائق | Stale | في Cache | اعرض cache + حدث |
| 10+ دقائق | Stale | انمسح | اجلب من جديد |

---

## ❓ س7: شرح getNextPageParam؟

**الجواب:**

```typescript
getNextPageParam: (lastPage) => {
  return lastPage.hasMore ? lastPage.page + 1 : undefined;
}
```

**كيف تشتغل:**
- React Query تناديها بعد كل fetch
- لو رجعت رقم: في صفحة جاية
- لو رجعت undefined: ما في صفحات أكثر

**مثال:**
```
Page 1 → hasMore: true → ترجع 2
Page 2 → hasMore: true → ترجع 3
...
Page 7 → hasMore: false → ترجع undefined
```

لما ترجع undefined:
- hasNextPage = false
- fetchNextPage() ما تشتغل

---

## ❓ س8: ليش حطيت category و searchQuery في queryKey؟

**الجواب:**

```typescript
queryKey: ['products', category, searchQuery]
```

**السبب:** كل combination = query منفصلة

**بدونهم:**
```typescript
queryKey: ['products']  // ❌

// المستخدم في All → 60 منتج
// غير لـ Electronics
// React Query: "نفس المفتاح! استخدم cache"
// النتيجة: يعرض منتجات All ❌
```

**معهم:**
```typescript
['products', 'All', '']           // Query 1
['products', 'Electronics', '']   // Query 2

// لما يغير: مفتاح جديد → fetch جديد ✅
```

**الفوايد:**
- كل filter عنده cache خاص
- لما ترجع: البيانات جاهزة
- الـ pagination تبدأ من جديد

---

# القسم الثالث: TypeScript

## ❓ س9: ليش سويت ملف types.ts منفصل؟

**الجواب:**

**قبل:** Types متفرقة في كل ملف (duplication)
**بعد:** ملف واحد للـ types

```typescript
// src/mocks/types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  // ...
}
```

**الفوايد:**
- Single source of truth
- تعديل واحد يطبق على كل شي
- ما في تكرار
- أي developer يعرف وين يلاقي الـ types

---

## ❓ س10: شرح void في TypeScript؟

**الجواب:**

```typescript
onRetry?: () => void
```

**المعنى:**
- `?` = optional
- `()` = ما تاخذ parameters
- `void` = ما ترجع قيمة

**مثال:**
```typescript
// ✅ صح
const retry = () => {
  console.log('retry');
  fetchData();
};

// ❌ غلط
const wrong = () => {
  return 'done';  // ترجع string
};
```

**الفكرة:** void للـ functions اللي تسوي action بس، مو ترجع نتيجة.

---

# القسم الرابع: MSW

## ❓ س11: كيف MSW تشتغل؟

**الجواب:**

MSW تمسك الـ requests في الـ browser:

```
App → fetch('/api/items')
  ↓
Service Worker يمسك الـ request
  ↓
MSW Handler يعالج الـ request
  ↓
يرجع mock data
  ↓
App يستقبل البيانات
```

**الفوايد:**
- واقعي (real fetch calls)
- ما يحتاج backend
- يشتغل في browser و tests

---

## ❓ س12: ليش MSW في production؟

**الجواب:**

عادةً MSW للـ development بس، بس في حالتنا:

**السبب:** ما عندنا real backend، فشغلناها في production للـ demo

**في real project:**
```typescript
if (process.env.NODE_ENV === 'development') {
  worker.start();
}
```

**للـ demo:** شغلناها دايم عشان تشتغل على Vercel

---

# القسم الخامس: UI/UX

## ❓ س13: كيف سويت الـ responsive design؟

**الجواب:**

استخدمت Tailwind breakpoints:

```typescript
// Mobile first
className="flex flex-col md:flex-row"
//         ↑ mobile    ↑ desktop

// Grid responsive
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//         ↑ mobile  ↑ tablet    ↑ laptop    ↑ desktop
```

**الأحجام:**
- Mobile: 1 column
- Tablet: 2 columns
- Laptop: 3 columns
- Desktop: 4 columns

---

## ❓ س14: شرح الـ loading states؟

**الجواب:**

عندي 3 loading states:

**1. Initial Loading:**
```typescript
{isLoading && <LoadingSpinner text="Loading products..." />}
```

**2. Loading Next Page:**
```typescript
{isFetchingNextPage && <LoadingSpinner text="Loading more..." />}
```

**3. No Loading:**
```typescript
{!isLoading && !isFetchingNextPage && <ProductGrid />}
```

**الفايدة:** المستخدم يعرف إيش يصير

---

## ❓ س15: كيف تعامل الـ errors؟

**الجواب:**

**1. Error Simulation:**
```typescript
if (pageParam > 2 && !isRetrying) {
  throw new Error('Network error');
}
```

**2. Error Display:**
```typescript
{isError && (
  <ErrorMessage onRetry={() => {
    triggerRetry();
    fetchNextPage();
  }} />
)}
```

**3. Retry Logic:**
```typescript
let isRetrying = false;

export const triggerRetry = () => {
  isRetrying = true;
};
```

**الفكرة:** لو حصل error، المستخدم يقدر يحاول مرة ثانية

---

# القسم السادس: Bonus Features

## ❓ س16: كيف سويت الـ Search؟

**الجواب:**

**1. State Management:**
```typescript
const [searchQuery, setSearchQuery] = useState('');
```

**2. في الـ queryKey:**
```typescript
queryKey: ['products', category, searchQuery]
```

**3. في الـ API:**
```typescript
if (searchQuery) {
  params.append('q', searchQuery);
}
```

**4. في الـ Handler:**
```typescript
const searchTerm = url.searchParams.get('q');
const filtered = products.filter(p => 
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

**الفكرة:** Search = filter جديد = query جديدة

---

## ❓ س17: كيف تشتغل الـ Category Filter؟

**الجواب:**

**1. Categories:**
```typescript
const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];
```

**2. State:**
```typescript
const [selectedCategory, setSelectedCategory] = useState('All');
```

**3. في الـ queryKey:**
```typescript
queryKey: ['products', category, searchQuery]
```

**4. في الـ Handler:**
```typescript
if (category !== 'All') {
  filtered = products.filter(p => p.category === category);
}
```

**الفكرة:** كل category = cache منفصل

---

# القسم السابع: Architecture

## ❓ س18: شرح الـ project structure؟

**الجواب:**

```
src/
├── components/          # UI Components
│   ├── ProductListPage.tsx
│   ├── ProductCard.tsx
│   ├── Header.tsx
│   └── ...
├── hooks/
│   └── useProducts.ts   # React Query hook
├── mocks/
│   ├── types.ts         # TypeScript types
│   ├── handlers.ts      # MSW handlers
│   └── data.ts          # Mock data
└── App.tsx
```

**الفكرة:** كل شي في مكانه

---

## ❓ س19: ليش فصلت الـ useProducts hook؟

**الجواب:**

**الفوايد:**
- Reusability: أقدر أستخدمه في أي component
- Testability: أقدر أختبره لحاله
- Separation of Concerns: logic منفصل عن UI
- Clean Code: الـ component أبسط

**قبل:**
```typescript
// ❌ كل شي في الـ component
function ProductList() {
  const { data } = useInfiniteQuery({...});
  // 50 سطر logic
}
```

**بعد:**
```typescript
// ✅ Hook منفصل
function ProductList() {
  const { data } = useProducts();
  // UI بس
}
```

---

# القسم الثامن: Problem Solving

## ❓ س20: إيش أكبر تحدي واجهته؟

**الجواب:**

**التحدي:** لما أغير الـ filter، المنتجات ما تتحدث

**السبب:** queryKey ما فيه category
```typescript
queryKey: ['products']  // ❌
```

**الحل:** أضفت category للـ key
```typescript
queryKey: ['products', category, searchQuery]  // ✅
```

**النتيجة:** كل filter = query جديدة = fetch جديد

---

## ❓ س21: كيف تختبر الـ infinite scroll؟

**الجواب:**

**1. Manual Testing:**
- افتح الـ app
- scroll لتحت
- شوف إذا الصفحات تتحمل

**2. Network Tab:**
- افتح DevTools
- شوف الـ requests
- تأكد من pagination

**3. Edge Cases:**
- آخر صفحة (15 منتج بس)
- Error handling
- Slow network

---

## ❓ س22: لو عندك 2 مليون منتج، كيف تحلها؟

**الجواب:**

**المشكلة الحالية:** كل المنتجات في memory

**الحل:**

**1. Real Database:**
```sql
SELECT * FROM products 
LIMIT 20 OFFSET ${(page-1) * 20}
```

**2. Backend Pagination:**
- الـ database يحسب pagination
- نرجع 20 منتج بس
- ما نحمل كل شي في memory

**3. Indexing:**
```sql
CREATE INDEX idx_category ON products(category);
```

**4. Caching Layer:**
- Redis للـ frequently accessed data
- CDN للـ images

**الفكرة:** الـ in-memory pagination للـ demos بس، مو للـ production

---

## ❓ س23: إيش تعلمت من المشروع؟

**الجواب:**

**1. React Query:**
- useInfiniteQuery قوية جداً
- Caching strategy مهمة
- queryKey = caching strategy

**2. MSW:**
- Mock APIs واقعية
- ما تحتاج backend للـ development

**3. TypeScript:**
- Types تمنع bugs كثيرة
- Single source of truth للـ types

**4. Performance:**
- Intersection Observer أفضل من scroll events
- Caching يوفر requests كثيرة

**5. UX:**
- Loading states مهمة
- Error handling ضروري
- Responsive design أساسي

---

## ❓ س24: لو تسوي المشروع من جديد، إيش تغير؟

**الجواب:**

**1. Testing:**
- أضيف unit tests للـ hooks
- integration tests للـ components

**2. Accessibility:**
- ARIA labels
- Keyboard navigation
- Screen reader support

**3. Performance:**
- Image lazy loading
- Virtual scrolling للـ lists الطويلة
- Code splitting

**4. Features:**
- Sorting options
- Advanced filters
- Favorites/Wishlist

**5. Documentation:**
- JSDoc comments
- Storybook للـ components

---

## 🎯 نصائح للمقابلة

### قبل المقابلة:
- راجع الكود كامل
- افهم كل decision سويتها
- جهز أمثلة من الكود

### أثناء المقابلة:
- اشرح بوضوح
- استخدم أمثلة
- ارسم diagrams لو تحتاج
- اعترف لو ما تعرف شي

### بعد السؤال:
- اسأل "هل تبغى تفاصيل أكثر؟"
- اربط بمشاريع ثانية
- وضح الـ trade-offs

---

## 📝 ملاحظات مهمة

**1. الأرقام:**
- 135 منتج total
- 20 منتج per page
- 7 صفحات
- 300-1000ms delay

**2. المكتبات:**
- React 18
- TypeScript
- React Query (TanStack Query)
- MSW
- Tailwind CSS
- react-intersection-observer

**3. Features:**
- Infinite scroll
- Search
- Category filter
- Error handling
- Loading states
- Responsive design

---

**Good Luck! 🚀**
