Hooks.once("ready", async () => {
    if (!game.user.isGM) return;

    let folder = game.folders.find(
        f => f.type === "Macro" && f.name === "JoToMo Macros"
    );
    if (!folder) {
        folder = await Folder.create({
            name: "JoToMo Macros",
            type: "Macro"
        });
    }

    await syncCompendiumMacros(folder);
});

const MACROS_CONFIG = [
    {
        name: 'Gold',
        version: '1.0.1',
        image: 'gold.webp',
        content: 'gold.js',
    }, {
        name: 'Minions Attack',
        version: '1.0.0',
        image: 'minions.webp',
        content: 'minions_attack_3inputs.js',
    }, {
        name: 'Pythagoras',
        version: '1.0.0',
        image: 'pythagoras.webp',
        content: 'pythagoras.js',
    }, {
        name: 'Conditions',
        version: '1.0.0',
        image: 'conditions.webp',
        content: 'conditions_v2.js',
    }, {
        name: 'Weather',
        version: '1.0.0',
        image: 'weather.webp',
        content: 'weather/weather_card_12.js',
    }, {
        name: 'Travel Checks',
        version: '1.0.0',
        image: 'travel_checks.webp',
        content: 'checks/travel_checks.js',
    }, {
        name: 'Checks',
        version: '1.0.0',
        image: 'checks.svg',
        content: 'checks/checks.js',
    }, {
        name: 'Multi Checks',
        version: '1.0.0',
        image: 'multi_checks.svg',
        content: 'checks/multi_checks_multi_types.js',
    }
]

async function syncCompendiumMacros(folder) {
    for (const macroConfig of MACROS_CONFIG) {
        const existing = game.macros.find(
            m => m.name === macroConfig.name && m.folder?.id === folder.id
        );

        if (existing) {
            // update
            const currentVersion = existing.getFlag('jotomo_macros', 'version') ?? '';

            if (currentVersion < macroConfig.version) {
                // update
                const content = {
                    command: await loadMacroSource(macroConfig.content),
                    flags: {
                        'jotomo_macros': {
                            'version': macroConfig.version,
                        }
                    }
                };
                if (!!macroConfig.image) {
                    content.img = `modules/jotomo_macros/assets/images/${macroConfig.image}`;
                }

                await existing.update(content);
            }
        } else {
            // create
            const content = {
                name: macroConfig.name,
                type: 'script',
                folder: folder.id,
                command: await loadMacroSource(macroConfig.content),
                flags: {
                    'jotomo_macros': {
                        'version': macroConfig.version,
                    }
                }
            };
            if (!!macroConfig.image) {
                content.img = `modules/jotomo_macros/assets/images/${macroConfig.image}`;
            }
            await Macro.create(content)
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