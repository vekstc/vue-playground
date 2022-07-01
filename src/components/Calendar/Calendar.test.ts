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

  it("changes to previous month", async () => {
    const wrapper = shallowMount(Calendar);
    const nextMonthButton = wrapper.find("[data-testid='prevMonth']");
    await nextMonthButton.trigger("click");

    expect(wrapper.find("h2").text()).toContain("Jun 2022");
  });

  it("changes to next month", async () => {
    const wrapper = shallowMount(Calendar);
    const nextMonthButton = wrapper.find("[data-testid='nextMonth']");
    await nextMonthButton.trigger("click");

    expect(wrapper.find("h2").text()).toContain("Aug 2022");
  });
});
