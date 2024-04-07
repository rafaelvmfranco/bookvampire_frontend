import { test } from "@playwright/test";

import { login } from "../../utils/login";
import { testChat } from "./utils/testChat";
import { testDeleteChats } from "./utils/testDeleteChats";
import { testSelectBrain } from "./utils/testSelectBrain";
import { testUnplugChat } from "./utils/testUnplugChat";

export const chatTests = (): void => {
  test("chat", async ({ page }) => {
    await login(page);
    await testChat(page);
    await testUnplugChat(page);
    await testSelectBrain(page);
    await testDeleteChats(page);
  });
};
