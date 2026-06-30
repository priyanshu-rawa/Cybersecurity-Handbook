import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Атаусыз",
    description: "Сипаттама берілмеген",
  },
  components: {
    callout: {
      note: "Ескерту",
      abstract: "Аннотация",
      info: "Ақпарат",
      todo: "Істеу керек",
      tip: "Кеңес",
      success: "Сәттілік",
      question: "Сұрақ",
      warning: "Ескерту",
      failure: "Қате",
      danger: "Қауіп",
      bug: "Қате",
      example: "Мысал",
      quote: "Дәйексөз",
    },
    backlinks: {
      title: "Артқа сілтемелер",
      noBacklinksFound: "Артқа сілтемелер табылмады",
    },
    themeToggle: {
      lightMode: "Жарық режимі",
      darkMode: "Қараңғы режим",
    },
    readerMode: {
      title: "Оқу режимі",
    },
    explorer: {
      title: "Зерттеуші",
    },
    footer: {
      createdWith: "Құрастырылған құрал:",
    },
    graph: {
      title: "Граф көрінісі",
    },
    recentNotes: {
      title: "Соңғы жазбалар",
      seeRemainingMore: ({ remaining }) => `Тағы ${remaining} жазбаны қарау →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `${targetSlug} кірістіру`,
      linkToOriginal: "Бастапқыға сілтеме",
    },
    search: {
      title: "Іздеу",
      searchBarPlaceholder: "Бірдеңе іздеу",
    },
    tableOfContents: {
      title: "Мазмұны",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} мин оқу`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Соңғы жазбалар",
      lastFewNotes: ({ count }) => `Соңғы ${count} жазба`,
    },
    error: {
      title: "Табылмады",
      notFound: "Бұл бет жеке немесе жоқ болуы мүмкін.",
      home: "Басты бетке оралу",
    },
    folderContent: {
      folder: "Қалта",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "Бұл қалтада 1 элемент бар." : `Бұл қалтада ${count} элемент бар.`,
    },
    tagContent: {
      tag: "Тег",
      tagIndex: "Тегтер индексі",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "Бұл тегпен 1 элемент." : `Бұл тегпен ${count} элемент.`,
      showingFirst: ({ count }) => `Алғашқы ${count} тег көрсетілуде.`,
      totalTags: ({ count }) => `Барлығы ${count} тег табылды.`,
    },
  },
} as const satisfies Translation
