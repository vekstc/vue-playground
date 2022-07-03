import { h, ref, defineComponent, onMounted, computed } from "vue";

import { onClickOutside } from "@vueuse/core";

const MonthDropdown = defineComponent({
  name: "MonthDropdown",
  props: {
    modelValue: {
      type: String,
    },
    refocus: {
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

    type OptionType = {
      name: string | null;
      el: HTMLElement;
    };

    type MonthName = typeof months[number];

    const options = ref<Array<OptionType>>([]);

    const setOptions = (el: HTMLElement, idx: number) => {
      if (el) {
        options.value[idx] = {
          name: el.textContent,
          el: el,
        };
      }
    };

    const findOptionIndex = (name: MonthName): number =>
      months.findIndex((month) => month == name);

    const ariaActivedescendant = computed(() => {
      const idx = props.modelValue ? findOptionIndex(props.modelValue) : 0;
      return options.value[idx]?.name;
    });

    onMounted(() => {
      options.value
        .filter((option) => option.name == props.modelValue)[0]
        ?.el.focus();
    });

    const isSelected = (name: MonthName) =>
      computed<number>(() => (props.modelValue == name ? 0 : -1));

    const selectPrevOption = (name: MonthName) => {
      let idx: number = findOptionIndex(name) - 1;

      if (idx < 0) idx = months.length - 1;

      options.value[idx].el.focus();
    };

    const selectNextOption = (name: MonthName) => {
      let idx: number = findOptionIndex(name) + 1;

      if (idx >= months.length) idx = 0;

      options.value[idx].el.focus();
    };

    const select = (name: MonthName) => {
      emit("update:modelValue", name);
      emit("close");

      if (props.refocus) {
        const el = document.querySelector(`#${props.refocus}`) as HTMLElement;
        if (el) {
          el.focus();
        }
      }
    };

    return () =>
      h(
        "button",
        {
          role: "listbox",
          "aria-orientation": "vertical",
          "aria-activedescendant": ariaActivedescendant.value,
          class:
            "absolute top-2 w-16 border border-gray-300 bg-white shadow rounded-lg list-none",
          "data-testid": "monthDropdown",
        },
        months.map((month, index) =>
          h(
            "li",
            {
              role: "option",
              tabindex: isSelected(month).value,
              ref: (el) => setOptions(el as HTMLElement, index),
              class: `py-1 bg-gray-100 text-center cursor-pointer select-none hover:bg-blue-50 focus:outline-none focus:bg-blue-500 focus:text-white ${
                index == 0 ? "rounded-t-lg" : ""
              } ${index == months.length - 1 ? "rounded-b-lg" : ""} ${
                props.modelValue == month ? "bg-blue-100 text-blue-600" : ""
              }`,
              key: `month-${index}`,
              onClick: () => {
                emit("update:modelValue", month);
                emit("close");
              },
              onKeydown: (event: KeyboardEvent) => {
                switch (event.key) {
                  case "ArrowUp":
                    event.preventDefault();
                    selectPrevOption(month);
                    break;
                  case "ArrowDown":
                    event.preventDefault();
                    selectNextOption(month);
                    break;
                  case "Enter":
                    event.preventDefault();
                    select(month);
                    break;
                }
              },
            },
            month
          )
        )
      );
  },
});

export default MonthDropdown;
