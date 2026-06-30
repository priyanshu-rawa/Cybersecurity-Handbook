import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Không có tiêu đề",
    description: "Không có mô tả",
  },
  components: {
    callout: {
      note: "Ghi chú",
      abstract: "Tổng quan",
      info: "Thông tin",
      todo: "Cần phải làm",
      tip: "Gợi ý",
      success: "Thành công",
      question: "Câu hỏi",
      warning: "Cảnh báo",
      failure: "Thất bại",
      danger: "Nguy hiểm",
      bug: "Lỗi",
      example: "Ví dụ",
      quote: "Trích dẫn",
    },
    backlinks: {
      title: "Liên kết ngược",
      noBacklinksFound: "Không có liên kết ngược nào",
    },
    themeToggle: {
      lightMode: "Chế độ sáng",
      darkMode: "Chế độ tối",
    },
    readerMode: {
      title: "Chế độ đọc",
    },
    explorer: {
      title: "Nội dung",
    },
    footer: {
      createdWith: "Được tạo bằng",
    },
    graph: {
      title: "Sơ đồ",
    },
    recentNotes: {
      title: "Ghi chú gần đây",
      seeRemainingMore: ({ remaining }) => `Xem thêm ${remaining} ghi chú →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Trích dẫn toàn bộ từ ${targetSlug}`,
      linkToOriginal: "Xem trang gốc",
    },
    search: {
      title: "Tìm",
      searchBarPlaceholder: "Tìm kiếm thông tin",
    },
    tableOfContents: {
      title: "Mục lục",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} phút đọc`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Ghi chú gần đây",
      lastFewNotes: ({ count }) => `${count} Trang gần đây`,
    },
    error: {
      title: "Không tìm thấy",
      notFound: "Trang này riêng tư hoặc không tồn tại.",
      home: "Về trang chủ",
    },
    folderContent: {
      folder: "Thư mục",
      itemsUnderFolder: ({ count }) => `Có ${count} trang trong thư mục này.`,
    },
    tagContent: {
      tag: "Thẻ",
      tagIndex: "Danh sách thẻ",
      itemsUnderTag: ({ count }) => `Có ${count} trang gắn thẻ này.`,
      showingFirst: ({ count }) => `Đang hiển thị ${count} trang đầu tiên.`,
      totalTags: ({ count }) => `Có tổng cộng ${count} thẻ.`,
    },
  },
} as const satisfies Translation
