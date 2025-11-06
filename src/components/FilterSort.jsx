import React from "react";

export default class FilterSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilters: false,
            showSort: false,
            selected: {
                category: "All",
                price: "",
                neck: [],
                sleeves: [],
                fit: [],
                fabric: [],
                sizes: [],
            },
        };

        this.filtersRef = React.createRef();
        this.sortRef = React.createRef();

        // Data constants can be defined here
        this.categories = ["All", "Everyday Fits", "Gym & Sports Wear", "Hoodies", "Formal Wear", "Festive Collection"];
        this.priceRanges = ["Under ₹1000", "₹1000–2999", "₹3000–4999", "₹5000+"];
        this.neckTypes = ["V-Neck", "Round-Neck", "Collar", "Polo", "Stand Collar"];
        this.sleeveTypes = ["Half", "Full", "Sleeveless"];
        this.fits = ["Regular Fit", "Over-Sized", "Relaxed Fit"];
        this.fabrics = ["Cotton", "PP", "Honeycomb", "Rebok", "Softie", "Dry Fit Softie", "Dot Net", "2 Way", "4 Way", "Super Poly"];
        this.sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"];
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.state.showFilters && this.filtersRef.current && !this.filtersRef.current.contains(event.target)) {
            this.setState({ showFilters: false });
        }
        if (this.state.showSort && this.sortRef.current && !this.sortRef.current.contains(event.target)) {
            this.setState({ showSort: false });
        }
    };

    toggleFilter = (type, value) => {
        this.setState(prevState => {
            const currentSelection = prevState.selected[type];
            const isArray = Array.isArray(currentSelection);

            if (!isArray) {
                return { selected: { ...prevState.selected, [type]: value } };
            }

            const exists = currentSelection.includes(value);
            const newSelection = exists
                ? currentSelection.filter(v => v !== value)
                : [...currentSelection, value];

            return { selected: { ...prevState.selected, [type]: newSelection } };
        });
    };

    applyFilters = () => {
        this.props.onFilter?.(this.state.selected);
        this.setState({ showFilters: false });
    };

    clearAll = () => {
        this.setState({
            selected: {
                category: "All",
                price: "",
                neck: [],
                sleeves: [],
                fit: [],
                fabric: [],
                sizes: [],
            },
        });
    };

    render() {
        const { showFilters, showSort, selected } = this.state;
        const { onSort } = this.props;

        const filterSections = [
            { title: "CATEGORIES", type: "category", values: this.categories },
            { title: "PRICE", type: "price", values: this.priceRanges },
            { title: "NECK", type: "neck", values: this.neckTypes },
            { title: "SLEEVES", type: "sleeves", values: this.sleeveTypes },
            { title: "FIT", type: "fit", values: this.fits },
            { title: "FABRIC", type: "fabric", values: this.fabrics },
            { title: "SIZES", type: "sizes", values: this.sizes },
        ];

        return (
            <>
                {/* ====== Filter + Sort Buttons ====== */}
                <div className="filter-sort-bar">
                    <button className="filter-btn" onClick={() => this.setState({ showFilters: true })}>
                        Filters
                    </button>

                    <div className="sort-wrapper" ref={this.sortRef}>
                        <button className="sort-btn" onClick={() => this.setState(prev => ({ showSort: !prev.showSort }))}>
                            Sort By {showSort ? "▲" : "▼"}
                        </button>
                        {showSort && (
                            <div className="sort-dropdown">
                                <p onClick={() => onSort?.("newest")}>Newest</p>
                                <p onClick={() => onSort?.("low")}>Price: Low to High</p>
                                <p onClick={() => onSort?.("high")}>Price: High to Low</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ====== Filters Sidebar ====== */}
                {showFilters && (
                    <div className="filters-overlay">
                        <div className="filters-panel" ref={this.filtersRef}>
                            <div className="filters-header">
                                <h3>Filters</h3>
                                <button className="clear-btn" onClick={this.clearAll}>Clear all</button>
                            </div>

                            {/* FILTER SECTIONS */}
                            {filterSections.map(section => (
                                <div className="filter-section" key={section.type}>
                                    <h4>{section.title}</h4>
                                    <div className="filter-grid">
                                        {section.values.map(val => {
                                            const isActive = Array.isArray(selected[section.type])
                                                ? selected[section.type].includes(val)
                                                : selected[section.type] === val;
                                            return (
                                                <button
                                                    key={val}
                                                    className={`filter-chip ${isActive ? "active" : ""}`}
                                                    onClick={() => this.toggleFilter(section.type, val)}
                                                >
                                                    {val}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            <div className="filters-footer">
                                <button className="close-btn" onClick={() => this.setState({ showFilters: false })}>Close</button>
                                <button className="apply-btn" onClick={this.applyFilters}>Apply Filters</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ====== Inline CSS ====== */}
                <style>{`
.filter-sort-bar {
display: flex;
gap: 15px;
margin: 20px 0;
}

.filter-btn,
.sort-btn {
    // font-family: 'Poppins', Arial, sans-serif;
    border: none;
    color: #fff;
    background: #37526dff;
    padding: 15px 30px;
    border-radius: 30px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    transition: all 0.3s ease;
}

.filter-btn:hover,
.sort-btn:hover {
    color: #37526dff; 
    background: #f5f5f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.sort-wrapper {
    position: relative;
}

.sort-dropdown {
    position: absolute;
    top: 110%;
    right: 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-width: 180px;
    overflow: hidden;
    z-index: 999;
}

.sort-dropdown p {
    margin: 0;
    padding: 10px 14px;
    cursor: pointer;
    font-size: 14px;
}

.sort-dropdown p:hover {
    background: #f5f5f5;
}

.filters-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    z-index: 1000;
}

.filters-panel {
    background: #fff;
    width: 340px;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.clear-btn {
    background: none;
    color: #007bff;
    border: none;
    cursor: pointer;
    font-size: 14px;
}

.filter-section {
    border-top: 1px solid #eee;
    padding-top: 14px;
    margin-top: 14px;
}

.filter-section h4 {
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 600;
}

.filter-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-chip {
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 13px;
}

.filter-chip.active {
    background: rgba(255, 0, 0, 0.08);
    border-color: #f00;
    color: #d00;
}

.filters-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding-top: 16px;
}

.close-btn {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    padding: 10px;
}

.apply-btn {
    flex: 1;
    border: none;
    background: #d32f2f;
    color: #fff;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    font-weight: 600;
}
`}</style>
            </>
        );
    }
}