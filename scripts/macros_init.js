Hooks.once("ready", async () => {
    if (!game.user.isGM) return;

    const pack = game.packs.get("jotomo_macros.jotomo-macros");
    await pack.configure({
        locked: false
    });

    await syncCompendiumMacros(pack);

    await pack.configure({
        locked: false
    });
});

const MACROS_CONFIG = [{
    name: 'Gold',
    version: '1.0.0',
    image: 'assets/images/gold.png',
    content: 'gold.js',
}
]

async function syncCompendiumMacros(pack) {
    const documents = await pack.getDocuments();
    for (const macroConfig of MACROS_CONFIG) {
        const existing = documents.find(
            m => m.name === macroConfig.name
        );

        if (existing) {
            // update
            const currentVersion = existing.getFlag('jotomo_macros', 'version') ?? '';

            if (currentVersion < macroConfig.version) {
                // update
                await existing.update({
                    command: await loadMacroSource(macroConfig.content),
                    img: macroConfig.image,
                    flags: {
                        'jotomo_macros': {
                            'version': macroConfig.version,
                        }
                    }
                })
            }
        } else {
            // create
            await Macro.create({
                name: macroConfig.name,
                type: 'script',
                command: await loadMacroSource(macroConfig.content),
                img: macroConfig.image,
                flags: {
                    'jotomo_macros': {
                        'version': macroConfig.version,
                    }
                }
            }, {
                pack: 'jotomo_macros.jotomo-macros',
            })
        }
    }
}

async function loadMacroSource(filename) {
    const response = await fetch(
        `modules/jotomo_macros/scripts/macros/${filename}`
    );

    if (!response.ok) {
        throw new Error(`Failed to load macro: ${filename}`);
    }

    return response.text();
}