import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Senza titolo",
    description: "Nessuna descrizione",
  },
  components: {
    callout: {
      note: "Nota",
      abstract: "Abstract",
      info: "Info",
      todo: "Da fare",
      tip: "Consiglio",
      success: "Completato",
      question: "Domanda",
      warning: "Attenzione",
      failure: "Errore",
      danger: "Pericolo",
      bug: "Problema",
      example: "Esempio",
      quote: "Citazione",
    },
    backlinks: {
      title: "Link entranti",
      noBacklinksFound: "Nessun link entrante",
    },
    themeToggle: {
      lightMode: "Tema chiaro",
      darkMode: "Tema scuro",
    },
    readerMode: {
      title: "Modalità lettura",
    },
    explorer: {
      title: "Esplora",
    },
    footer: {
      createdWith: "Creato con",
    },
    graph: {
      title: "Vista grafico",
    },
    recentNotes: {
      title: "Note recenti",
      seeRemainingMore: ({ remaining }) =>
        remaining === 1 ? "Vedi 1 altra →" : `Vedi altre ${remaining} →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Inclusione di ${targetSlug}`,
      linkToOriginal: "Link all'originale",
    },
    search: {
      title: "Cerca",
      searchBarPlaceholder: "Cerca qualcosa",
    },
    tableOfContents: {
      title: "Indice",
    },
    contentMeta: {
      readingTime: ({ minutes }) => (minutes === 1 ? "1 minuto" : `${minutes} minuti`),
    },
  },
  pages: {
    rss: {
      recentNotes: "Note recenti",
      lastFewNotes: ({ count }) => (count === 1 ? "Ultima nota" : `Ultime ${count} note`),
    },
    error: {
      title: "Non trovato",
      notFound: "Questa pagina è privata o non esiste.",
      home: "Ritorna alla home page",
    },
    folderContent: {
      folder: "Cartella",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 oggetto in questa cartella." : `${count} oggetti in questa cartella.`,
    },
    tagContent: {
      tag: "Etichetta",
      tagIndex: "Indice etichette",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 oggetto con questa etichetta." : `${count} oggetti con questa etichetta.`,
      showingFirst: ({ count }) => (count === 1 ? "Prima etichetta." : `Prime ${count} etichette.`),
      totalTags: ({ count }) =>
        count === 1 ? "Trovata 1 etichetta in totale." : `Trovate ${count} etichette totali.`,
    },
  },
} as const satisfies Translation
