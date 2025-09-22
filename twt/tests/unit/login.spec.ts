import { mount } from "@vue/test-utils";
import LoginPage from "@/views/LoginPage.vue";
import { describe, expect, test } from "vitest";

describe("LoginPage.vue", () => {
  test("renders login vue", () => {
    const wrapper = mount(LoginPage);
    expect(wrapper.text()).toMatch("Google");
  });
});
