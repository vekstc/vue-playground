import { shallowMount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance } from "vue";
import Calendar from "./Calendar.vue";

describe("Calendar", () => {
  const createWrapper = (): VueWrapper<ComponentPublicInstance> =>
    shallowMount(Calendar);

  it("displays correct date", () => {
    const wrapper = createWrapper();

    expect(wrapper.text()).toContain("Jul 2022");
  });

  it("shows correct number of days", () => {
    const wrapper = createWrapper();

    expect(wrapper.findAll("ul > li").length).toBe(35);
  });

  it("changes and displays previous month", async () => {
    const wrapper = createWrapper();

    const nextMonthButton = wrapper.find("[data-testid='prevMonth']");
    await nextMonthButton.trigger("click");

    expect(wrapper.find("h2").text()).toContain("Jun 2022");
  });

  it("changes and displays next month", async () => {
    const wrapper = createWrapper();

    const nextMonthButton = wrapper.find("[data-testid='nextMonth']");
    await nextMonthButton.trigger("click");

    expect(wrapper.find("h2").text()).toContain("Aug 2022");
  });
});
