import { shallowMount } from "@vue/test-utils";
import Calendar from "./Calendar.vue";

describe("Calendar", () => {
  it("displays correct date", () => {
    const wrapper = shallowMount(Calendar);

    expect(wrapper.text()).toContain("Jul 2022");
  });

  it("shows correct number of days", () => {
    const wrapper = shallowMount(Calendar);

    expect(wrapper.findAll("ul > li").length).toBe(35);
  });
});
