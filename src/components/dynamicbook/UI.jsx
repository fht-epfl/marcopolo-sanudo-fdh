import { atom, useAtom } from "jotai";

const pictures = [
    "people1",
    "people2",
    "observation1",
    "observation2",
    "place1",
    "place2",
    "relation1",
    "relation2",
    "relation3",
    "relation4",
];

export const pageAtom = atom(0);
export const pages = [
    {
        front: "book-cover",
        back: pictures[0],
    },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
    pages.push({
        front: pictures[i % pictures.length],
        back: pictures[(i + 1) % pictures.length],
    });
}

pages.push({
    front: pictures[pictures.length - 1],
    back: "book-back",
});
export const UI = () => {
    const [page, setPage] = useAtom(pageAtom);

    // change
    const labels = ["Cover", "PEOPLE", "OBSERVATION", "PLACE", "RELATION (BSC)", "RELATION (ADV)", "Back Cover"];

    return (
        <>
            <main className=" pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
                <div className="w-full overflow-auto pointer-events-auto flex justify-center absolute bottom-10">
                    <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
                        {labels.map((label, index) => (
                            <button
                                key={index}
                                className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                                    index === page
                                        ? "bg-white/90 text-black"
                                        : "bg-black/30 text-white"
                                }`}
                                onClick={() => setPage(index)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};
