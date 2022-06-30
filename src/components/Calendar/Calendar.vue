<script setup lang="ts">
import { startOfToday } from "date-fns";

const today = startOfToday();
</script>

<template>Today is {{ today }}</template>
