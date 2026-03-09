# העלאת האתר לרשת (פריסה)

הפרויקט הוא Next.js עם MongoDB. הדרך הפשוטה ביותר: **Vercel** (חינם) + **MongoDB Atlas** (כבר בשימוש).

---

## 1. הכנה – Git

אם הפרויקט עדיין לא ב-Git:

```bash
git init
git add .
git commit -m "Initial commit"
```

צור ריפו ב-**GitHub** (או GitLab), חבר אליו והעלה:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

**חשוב:** הקובץ `.env.local` לא יועלה (הוא ב-.gitignore). את משתני הסביבה תגדיר ב-Vercel.

---

## 2. Vercel – פריסת האתר

1. היכנס ל־**[vercel.com](https://vercel.com)** והתחבר עם חשבון GitHub.
2. **Add New** → **Project** ובחר את הריפו של הפרויקט.
3. **Framework Preset:** Next.js (יזוהה אוטומטית).
4. **Root Directory:** השאר ריק (או `./` אם הפרויקט בתיקייה).
5. לפני **Deploy** – לחץ **Environment Variables** והוסף:

   | Name            | Value                    | Environment   |
   |-----------------|--------------------------|---------------|
   | `MONGODB_URI`   | מחרוזת החיבור מ-Atlas   | Production (ו־Preview אם צריך) |
   | `ADMIN_SECRET`  | סיסמת המנהל (חזקה)     | Production, Preview |
   | `NEXT_PUBLIC_WHATSAPP_PHONE` | מספר לוואטסאפ (כולל קידומת מדינה) | Production, Preview |

   העתק את הערכים מ־`.env.local` (בלי להעלות את הקובץ ל-Git).

6. **Deploy**. אחרי כמה דקות תקבל קישור, למשל:  
   `https://your-project.vercel.app`

---

## 3. MongoDB Atlas – גישה מהרשת

- ב־Atlas: **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) כדי ש-Vercel יוכל להתחבר.
- וודא ש־**Database User** קיים והסיסמה נכונה, ושמשתמשים באותה `MONGODB_URI` ב-Vercel.

---

## 4. דומיין משלך (אופציונלי)

- ב-Vercel: **Project** → **Settings** → **Domains**.
- הוסף דומיין (למשל `thefootykits.co.il`) ועקוב אחרי ההוראות להצמדת ה-DNS (CNAME או A record).

---

## 5. עדכונים אחרי שינויי קוד

בכל `git push` ל־main, Vercel יבנה ויעלה גרסה חדשה אוטומטית.

```bash
git add .
git commit -m "תיאור השינוי"
git push
```

---

## חלופות ל-Vercel

- **Netlify** – דומה, תומך ב-Next.js.
- **Railway / Render / Fly.io** – אם תרצה שרת עם Node תמיד פעיל (לא חובה לפרויקט הזה).

---

## בדיקה לפני פריסה

במחשב המקומי:

```bash
npm run build
npm run start
```

אם אין שגיאות – הסביבה מוכנה לפריסה ב-Vercel.
