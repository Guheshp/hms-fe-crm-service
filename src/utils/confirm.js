import Swal from "sweetalert2";

export const confirmDelete = async (
  title = "Delete Record?",
  text = "This action cannot be undone.",
) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
    confirmButtonColor: "#d32f2f",
    cancelButtonColor: "#6b7280",

    didOpen: () => {
      const container = Swal.getContainer();

      if (container) {
        container.style.zIndex = "20000";
      }
    },
  });
};

export const confirmAction = async ({
  title = "Are you sure?",
  text = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon = "question",
  confirmButtonColor = "#16a34a",
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    focusCancel: true,
    confirmButtonColor,
    cancelButtonColor: "#6b7280",

    didOpen: () => {
      const container = Swal.getContainer();

      if (container) {
        container.style.zIndex = "20000";
      }
    },
  });
};
