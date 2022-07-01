<script setup lang="ts">
import {
  startOfToday,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  format,
} from "date-fns";

const today = startOfToday();

const days = eachDayOfInterval({
  start: startOfMonth(today),
  end: endOfWeek(endOfMonth(today)),
});
</script>

<template>
  <div class="w-[16rem]">
    <div class="flex items-center">
      <h2 class="flex-auto">{{ format(today, "MMM yyyy") }}</h2>
      <button type="button">
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
      <button type="button">
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

    <ul class="grid grid-cols-7">
      <li v-for="day in days">{{ format(day, "dd") }}</li>
    </ul>
  </div>
</template>
