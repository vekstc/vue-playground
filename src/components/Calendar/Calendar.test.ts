import { shallowMount, mount, VueWrapper } from "@vue/test-utils";
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

  it("highlights current day", () => {
    const wrapper = createWrapper();

    expect(wrapper.find(".text-blue-500").exists()).toBeTruthy();
  });

  it("changes month with dropdown", async () => {
    const wrapper: VueWrapper<ComponentPublicInstance> = mount(Calendar);

    const dropdown = wrapper.find('[data-testid="monthDropdownTrigger"]');

    await dropdown.trigger("click");

    const option = wrapper.findAll('[data-testid="monthDropdown"] > li');

    await option[2].trigger("click");

    expect(dropdown.exists()).toBeTruthy();

    expect(wrapper.find("h2").text()).toContain("Mar");
  });

  it("highlights correct month in dropdown", async () => {
    const wrapper: VueWrapper<ComponentPublicInstance> = mount(Calendar);

    const dropdown = wrapper.find('[data-testid="monthDropdownTrigger"]');

    await dropdown.trigger("click");

    expect(wrapper.find(".bg-blue-100.text-blue-600").exists()).toBeTruthy();
  });

  it("changes year with dropdown", async () => {
    const wrapper: VueWrapper<ComponentPublicInstance> = mount(Calendar);

    const dropdown = wrapper.find('[data-testid="yearDropdownTrigger"]');

    await dropdown.trigger("click");

    const option = wrapper.findAll('[data-testid="yearDropdown"] > li');

    await option[2].trigger("click");

    expect(dropdown.exists()).toBeTruthy();

    expect(wrapper.find("h2").text()).toContain("2021");
  });

  it("highlghts correct year in dropdown", async () => {
    const wrapper: VueWrapper<ComponentPublicInstance> = mount(Calendar);

    const dropdown = wrapper.find('[data-testid="yearDropdownTrigger"]');

    await dropdown.trigger("click");

    expect(wrapper.find(".bg-blue-100.text-blue-600").exists()).toBeTruthy();
  });
});
