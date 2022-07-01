import { shallowMount } from "@vue/test-utils";
import Calendar from "./Calendar.vue";

describe("Calendar", () => {
  it("displays correct date", () => {
    const wrapper = shallowMount(Calendar);

    expect(wrapper.text()).toContain("Jul 2022");
  });
});
