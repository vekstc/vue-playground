import { h, ref, defineComponent } from "vue";

import { onClickOutside } from "@vueuse/core";

const YearDropdown = defineComponent({
  name: "YearDropdown",
  props: {
    modelValue: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const years: number[] = [
      2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
    ];

    const el = ref();
    onClickOutside(el, () => emit("close"));

    return () =>
      h(
        "div",
        {
          ref: el,
          class:
            "absolute top-2 left-12 w-16 border border-gray-300 bg-white shadow rounded-lg list-none",
          "data-testid": "yearDropdown",
        },
        years.map((year, index) =>
          h(
            "li",
            {
              class: `py-1 bg-gray-100 text-center cursor-pointer select-none hover:bg-blue-50 ${
                index == 0 ? "rounded-t-lg" : ""
              } ${index == years.length - 1 ? "rounded-b-lg" : ""} ${
                props.modelValue == year ? "bg-blue-100 text-blue-600" : ""
              }`,
              key: `year-${index}`,
              onClick: () => {
                emit("update:modelValue", year);
                emit("close");
              },
            },
            year
          )
        )
      );
  },
});

export default YearDropdown;
