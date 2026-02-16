import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  payment: router({
    requestCardPaymentLink: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          amount: z.number().positive(),
          caseNumber: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { email, amount, caseNumber } = input;

        // Format the notification message
        const title = "New Card Payment Request";
        const content = `
Card Payment Request Details:

Email: ${email}
Amount: $${amount.toFixed(2)}
Case Number: ${caseNumber || "Not provided"}

Please forward this to the appropriate department to send a payment link to ${email}.
`;

        try {
          // Send notification to owner
          const success = await notifyOwner({ title, content });

          if (!success) {
            console.error("Failed to send notification to owner");
            return {
              success: false,
              error: "Failed to send notification. Please try again later.",
            };
          }

          return {
            success: true,
          };
        } catch (error) {
          console.error("Error sending card payment request:", error);
          return {
            success: false,
            error: "An error occurred while processing your request.",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
