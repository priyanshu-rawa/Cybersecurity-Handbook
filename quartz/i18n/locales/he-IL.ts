import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "ללא כותרת",
    description: "לא סופק תיאור",
  },
  direction: "rtl" as const,
  components: {
    callout: {
      note: "הערה",
      abstract: "תקציר",
      info: "מידע",
      todo: "לעשות",
      tip: "טיפ",
      success: "הצלחה",
      question: "שאלה",
      warning: "אזהרה",
      failure: "כשלון",
      danger: "סכנה",
      bug: "באג",
      example: "דוגמה",
      quote: "ציטוט",
    },
    backlinks: {
      title: "קישורים חוזרים",
      noBacklinksFound: "לא נמצאו קישורים חוזרים",
    },
    themeToggle: {
      lightMode: "מצב בהיר",
      darkMode: "מצב כהה",
    },
    readerMode: {
      title: "מצב קריאה",
    },
    explorer: {
      title: "סייר",
    },
    footer: {
      createdWith: "נוצר באמצעות",
    },
    graph: {
      title: "מבט גרף",
    },
    recentNotes: {
      title: "הערות אחרונות",
      seeRemainingMore: ({ remaining }) => `עיין ב ${remaining} נוספים →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `מצוטט מ ${targetSlug}`,
      linkToOriginal: "קישור למקורי",
    },
    search: {
      title: "חיפוש",
      searchBarPlaceholder: "חפשו משהו",
    },
    tableOfContents: {
      title: "תוכן עניינים",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} דקות קריאה`,
    },
  },
  pages: {
    rss: {
      recentNotes: "הערות אחרונות",
      lastFewNotes: ({ count }) => `${count} הערות אחרונות`,
    },
    error: {
      title: "לא נמצא",
      notFound: "העמוד הזה פרטי או לא קיים.",
      home: "חזרה לעמוד הבית",
    },
    folderContent: {
      folder: "תיקייה",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "פריט אחד תחת תיקייה זו." : `${count} פריטים תחת תיקייה זו.`,
    },
    tagContent: {
      tag: "תגית",
      tagIndex: "מפתח התגיות",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "פריט אחד עם תגית זו." : `${count} פריטים עם תגית זו.`,
      showingFirst: ({ count }) => `מראה את ה-${count} תגיות הראשונות.`,
      totalTags: ({ count }) => `${count} תגיות נמצאו סך הכל.`,
    },
  },
} as const satisfies Translation
