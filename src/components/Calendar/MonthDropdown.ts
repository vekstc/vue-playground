import { h, ref, defineComponent } from "vue";

import { onClickOutside } from "@vueuse/core";

const MonthDropdown = defineComponent({
  name: "MonthDropdown",
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const el = ref();
    onClickOutside(el, () => emit("close"));

    return () =>
      h(
        "div",
        {
          ref: el,
          class:
            "absolute top-2 w-16 border border-gray-300 bg-white shadow rounded-lg list-none",
          "data-testid": "monthDropdown",
        },
        months.map((month, index) =>
          h(
            "li",
            {
              class: `py-1 bg-gray-100 text-center cursor-pointer select-none hover:bg-blue-50 ${
                index == 0 ? "rounded-t-lg" : ""
              } ${index == months.length - 1 ? "rounded-b-lg" : ""} ${
                props.modelValue == month ? "bg-blue-100 text-blue-600" : ""
              }`,
              key: `month-${index}`,
              onClick: () => {
                emit("update:modelValue", month);
                emit("close");
              },
            },
            month
          )
        )
      );
  },
});

export default MonthDropdown;
