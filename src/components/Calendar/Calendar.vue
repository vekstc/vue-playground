<script setup lang="ts">
import { ref, computed } from "vue";

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
} from "date-fns";

const today = startOfToday();

const currentMonth = ref(format(today, "MMM-yyyy"));
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
  const firstDay = add(firstDayInCurrentMonth.value, { months: -1 });
  currentMonth.value = format(firstDay, "MMM-yyyy");
};

const nextMonth = () => {
  const firstDay = add(firstDayInCurrentMonth.value, { months: 1 });
  currentMonth.value = format(firstDay, "MMM-yyyy");
};
</script>

<template>
  <div class="w-[16rem] border border-gray-200">
    <div class="flex items-center p-2">
      <h2 class="flex-auto">
        {{ format(firstDayInCurrentMonth, "MMM yyyy") }}
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
        <li v-for="day in days" class="p-2">
          {{ format(day, "dd") }}
        </li>
      </ul>
    </div>
  </div>
</template>
