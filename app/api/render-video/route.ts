import { NextRequest, NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { tmpdir } from "os";

const compositionId = "MyVideo";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName } = body;

        if (!fullName || typeof fullName !== "string") {
            return NextResponse.json(
                { error: "Invalid name provided" },
                { status: 400 }
            );
        }

        console.log(`Starting render for: ${fullName}`);

        // Create a temporary output file
        const outputLocation = path.join(
            tmpdir(),
            `video-${Date.now()}-${Math.random().toString(36).substring(7)}.mp4`
        );

        try {
            // Bundle the Remotion project
            const bundleLocation = await bundle({
                entryPoint: path.join(process.cwd(), "components", "tools", "FunVideo.tsx"),
                webpackOverride: (config) => config,
            });

            // Get composition details
            const composition = await selectComposition({
                serveUrl: bundleLocation,
                id: compositionId,
                inputProps: { name: fullName },
            });

            // Render the video
            await renderMedia({
                composition,
                serveUrl: bundleLocation,
                codec: "h264",
                outputLocation,
                inputProps: { name: fullName },
            });

            console.log(`Video rendered successfully: ${outputLocation}`);

            // Read the file and send it as a response
            const videoBuffer = await fs.promises.readFile(outputLocation);

            // Clean up the temporary file
            await fs.promises.unlink(outputLocation).catch((err) => {
                console.error("Failed to delete temp file:", err);
            });

            // Convert Buffer to ArrayBuffer for NextResponse
            // Use Uint8Array to ensure we get a proper ArrayBuffer
            const uint8Array = new Uint8Array(videoBuffer);

            // Return the video file
            return new NextResponse(uint8Array, {
                headers: {
                    "Content-Type": "video/mp4",
                    "Content-Disposition": `attachment; filename="${fullName.replace(/\s+/g, "_")}_intro.mp4"`,
                },
            });
        } catch (renderError) {
            // Clean up temp file if it exists
            if (fs.existsSync(outputLocation)) {
                await fs.promises.unlink(outputLocation).catch(() => { });
            }
            throw renderError;
        }
    } catch (error) {
        console.error("Render error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Rendering failed" },
            { status: 500 }
        );
    }
}
