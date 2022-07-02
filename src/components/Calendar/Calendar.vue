<script setup lang="ts">
import { ref, reactive, computed } from "vue";

import {
  startOfToday,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  parse,
  add,
  format,
  isToday,
} from "date-fns";

const today = startOfToday();

const selectedMonth = ref<string>(format(today, "MMM"));
const selectedYear = ref<number>(parseInt(format(today, "yyyy")));

const currentMonth = computed<string>(
  () => `${selectedMonth.value}-${selectedYear.value}`
);

const firstDayInCurrentMonth = computed(() =>
  parse(currentMonth.value, "MMM-yyyy", new Date())
);

const days = computed(() =>
  eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayInCurrentMonth.value), {
      weekStartsOn: 1,
    }),
    end: endOfWeek(endOfMonth(firstDayInCurrentMonth.value), {
      weekStartsOn: 1,
    }),
  })
);

const prevMonth = () => {
  const prevMonth = add(firstDayInCurrentMonth.value, { months: -1 });

  selectedMonth.value = format(prevMonth, "MMM");
  selectedYear.value = parseInt(format(prevMonth, "yyyy"));
};

const nextMonth = () => {
  const nextMonth = add(firstDayInCurrentMonth.value, { months: 1 });

  selectedMonth.value = format(nextMonth, "MMM");
  selectedYear.value = parseInt(format(nextMonth, "yyyy"));
};

const visible = reactive<{ monthDropdown: boolean; yearDropdown: boolean }>({
  monthDropdown: false,
  yearDropdown: false,
});

import MonthDropdown from "./MonthDropdown";
import YearDropdown from "./YearDropdown";
</script>

<template>
  <div class="relative w-[16rem] border border-gray-200 bg-white">
    <div class="flex items-center p-2">
      <month-dropdown
        v-if="visible.monthDropdown"
        @close="visible.monthDropdown = false"
        v-model="selectedMonth"
      />

      <h2 class="flex-auto flex">
        <span class="flex items-center">
          {{ format(firstDayInCurrentMonth, "MMM") }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            data-testid="monthDropdownTrigger"
            @click="visible.monthDropdown = !visible.monthDropdown"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>

        <year-dropdown
          v-if="visible.yearDropdown"
          @close="visible.yearDropdown = false"
          v-model.number="selectedYear"
        />

        <span class="flex items-center">
          {{ format(firstDayInCurrentMonth, "yyyy") }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            data-testid="yearDropdownTrigger"
            @click="visible.yearDropdown = !visible.yearDropdown"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </h2>
      <button type="button" @click="prevMonth" data-testid="prevMonth">
        <span class="sr-only">Previous Month</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button type="button" @click="nextMonth" data-testid="nextMonth">
        <span class="sr-only">Next Month</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <div>
      <ol class="grid grid-cols-7 text-center">
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>T</li>
        <li>F</li>
        <li>S</li>
        <li>S</li>
      </ol>

      <ul class="grid grid-cols-7">
        <li
          v-for="day in days"
          class="p-2"
          :class="{ 'text-blue-500': isToday(day) }"
        >
          {{ format(day, "dd") }}
        </li>
      </ul>
    </div>
  </div>
</template>
