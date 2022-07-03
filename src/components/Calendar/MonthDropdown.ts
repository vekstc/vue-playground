import { h, ref, defineComponent, onMounted, computed } from "vue";

import { onClickOutside } from "@vueuse/core";

const MonthDropdown = defineComponent({
  name: "month-dropdown",
  props: {
    modelValue: {
      type: String,
      required: true,
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

    const el = ref<HTMLElement>();
    onClickOutside(el, () => emit("close"));

    const options = ref<HTMLElement[]>([]);

    onMounted(() => {
      const selectedIndex: number = options.value.findIndex(
        (option) => option.textContent == props.modelValue
      );
      options.value[selectedIndex].focus();
    });

    const ariaActivedescendant = computed<string>(() => props.modelValue);

    const isSelected = (name: any) =>
      computed<number>(() => (props.modelValue == name ? 0 : -1));

    const focusPrev = (index: number) => {
      index--;

      if (index < 0) index = options.value.length - 1;

      options.value[index].focus();
    };

    const focusNext = (index: number) => {
      index++;

      if (index >= months.length) index = 0;

      options.value[index].focus();
    };

    const select = (name: typeof months[number]) => {
      emit("update:modelValue", name);
      emit("close");

      if (props.refocus) {
        (document.querySelector(`#${props.refocus}`) as HTMLElement)?.focus();
      }
    };

    return () =>
      h(
        "ul",
        {
          ref: el,
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
              ref: (el: HTMLElement) => (options.value[index] = el),
              class: `py-1 bg-gray-100 text-center cursor-pointer select-none hover:bg-blue-50 focus:outline-none focus:bg-blue-500 focus:text-white ${
                index == 0 ? "rounded-t-lg" : ""
              } ${index == months.length - 1 ? "rounded-b-lg" : ""} ${
                props.modelValue == month ? "bg-blue-100 text-blue-600" : ""
              }`,
              key: `month-${index}`,
              onClick: () => select(month),
              onKeydown: (event: KeyboardEvent) => {
                switch (event.key) {
                  case "ArrowUp":
                    event.preventDefault();
                    focusPrev(index);
                    break;
                  case "ArrowDown":
                    event.preventDefault();
                    focusNext(index);
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
