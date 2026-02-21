import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';
import { ZoomIn, ZoomOut, Maximize, Activity, Info, Target } from 'lucide-react';

const GraphView = ({ data, onSelectNode, filterSuspiciousOnly = false, highlightNode = null }) => {
    const containerRef = useRef(null);
    const networkRef = useRef(null);
    const [physicsEnabled, setPhysicsEnabled] = useState(true);

    useEffect(() => {
        if (networkRef.current && highlightNode) {
            networkRef.current.selectNodes([highlightNode]);
            networkRef.current.focus(highlightNode, {
                scale: 1.2,
                animation: { duration: 1000, easingFunction: 'easeInOutQuad' }
            });
        }
    }, [highlightNode]);

    useEffect(() => {
        if (!containerRef.current || !data || !data.graph_data) return;

        let displayNodes = data.graph_data.nodes;
        let displayEdges = data.graph_data.edges;

        if (filterSuspiciousOnly) {
            displayNodes = displayNodes.filter(n => n.risk_score > 0);
            const suspNodeIds = new Set(displayNodes.map(n => n.id));
            displayEdges = displayEdges.filter(e => suspNodeIds.has(e.from_node) && suspNodeIds.has(e.to_node));
        }

        // Color palette for rings
        const ringColors = ['#f472b6', '#a78bfa', '#4ade80', '#fbbf24', '#22d3ee', '#818cf8', '#fb7185'];
        const getRingColor = (ringId) => {
            if (!ringId) return null;
            const numeric = parseInt(ringId.split('_')[1]) || 0;
            return ringColors[numeric % ringColors.length];
        };

        const nodes = displayNodes.map(node => {
            let color = '#3b82f6'; // Default Neon Blue
            const ringColor = getRingColor(node.ring_id);

            if (node.risk_score > 70) color = '#ef4444'; // Cyber Red
            else if (node.risk_score > 40) color = '#f97316'; // Industrial Orange

            // If part of a ring, give it a distinct ring color unless it's critical red
            const nodeColor = (node.risk_score > 80) ? '#ef4444' : (ringColor || color);

            const size = 20 + (node.risk_score / 100) * 40;

            return {
                id: node.id,
                label: node.id.slice(-6).toUpperCase(),
                title: `
                    <div class="p-3 font-sans bg-slate-900 text-white border border-white/10 rounded-xl shadow-2xl">
                        <div class="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Account ID</div>
                        <div class="font-mono text-blue-400 mb-2">${node.id}</div>
                        <div class="flex justify-between gap-4 border-t border-white/5 pt-2">
                            <span><b class="text-slate-500">Risk:</b> ${node.risk_score}%</span>
                            ${node.ring_id ? `<span><b class="text-slate-500">Ring:</b> ${node.ring_id}</span>` : ''}
                        </div>
                    </div>
                `,
                color: {
                    background: node.is_legitimate ? '#1e293b' : nodeColor,
                    border: node.ring_id ? '#fff' : (node.is_legitimate ? '#3b82f6' : 'rgba(255,255,255,0.1)'),
                    highlight: { background: nodeColor, border: '#fff' },
                    hover: { background: nodeColor, border: '#fff' }
                },
                size: size,
                shape: node.is_legitimate ? 'square' : 'dot',
                font: { color: 'rgba(255,255,255,0.8)', size: 12, face: 'JetBrains Mono', strokeWidth: 2, strokeColor: '#000' },
                borderWidth: node.ring_id ? 3 : (node.is_legitimate ? 3 : 1),
                shadow: node.risk_score > 70 ? { enabled: true, color: nodeColor, size: 25, x: 0, y: 0 } : { enabled: true, color: 'rgba(0,0,0,0.5)', size: 10 }
            };
        });

        const edges = displayEdges.map(edge => ({
            from: edge.from_node,
            to: edge.to_node,
            arrows: 'to',
            color: { color: 'rgba(255,255,255,0.05)', highlight: 'rgba(59,130,246,0.3)', hover: 'rgba(255,255,255,0.2)' },
            width: 1,
            smooth: { type: 'curvedCW', roundness: 0.2 }
        }));

        const options = {
            nodes: {
                borderWidth: 1,
                shadow: { enabled: true, color: 'rgba(0,0,0,0.5)', size: 10, x: 0, y: 5 }
            },
            edges: {
                selectionWidth: 2,
                hoverWidth: 2
            },
            physics: {
                enabled: physicsEnabled,
                barnesHut: {
                    gravitationalConstant: -10000,
                    centralGravity: 0.1,
                    springLength: 350,
                    springConstant: 0.04,
                    damping: 0.09
                },
                stabilization: { iterations: 150 }
            },
            interaction: {
                hover: true,
                tooltipDelay: 0,
                hideEdgesOnDrag: true
            }
        };

        networkRef.current = new Network(containerRef.current, { nodes, edges }, options);

        networkRef.current.on('selectNode', (params) => {
            const nodeId = params.nodes[0];
            const account = data.suspicious_accounts.find(a => a.account_id === nodeId);
            if (account) onSelectNode(account);
        });

        return () => {
            if (networkRef.current) {
                networkRef.current.destroy();
                networkRef.current = null;
            }
        };
    }, [data, filterSuspiciousOnly, physicsEnabled]);

    return (
        <div className="glass w-full h-[850px] mt-6 relative overflow-hidden group border-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />
            <div ref={containerRef} className="w-full h-full" />

            {/* Scanning Overlay Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scan_4s_infinite_linear] pointer-events-none" />

            {/* Controls */}
            <div className="absolute top-8 left-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 glass flex items-center justify-center rounded-2xl border-white/10 text-blue-500">
                        <Target size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">Topology Monitor</div>
                        <div className="text-sm font-bold text-slate-200">Behavioral Node Graph</div>
                    </div>
                </div>

                <div className="flex gap-2 p-1 glass bg-black/40 border-white/5 rounded-2xl">
                    <button onClick={() => networkRef.current?.moveTo({ scale: networkRef.current.getScale() * 1.5 })} className="p-3 hover:bg-white/5 rounded-xl transition-all"><ZoomIn size={18} /></button>
                    <button onClick={() => networkRef.current?.moveTo({ scale: networkRef.current.getScale() / 1.5 })} className="p-3 hover:bg-white/5 rounded-xl transition-all"><ZoomOut size={18} /></button>
                    <button onClick={() => networkRef.current?.fit()} className="p-3 hover:bg-white/5 rounded-xl transition-all"><Maximize size={18} /></button>
                    <button
                        onClick={() => setPhysicsEnabled(!physicsEnabled)}
                        className={`p-3 rounded-xl transition-all ${physicsEnabled ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500'}`}
                    >
                        <Activity size={18} />
                    </button>
                </div>
            </div>

            {/* Forensic Legend */}
            <div className="absolute bottom-8 left-8 p-6 glass bg-black/60 border-white/5 text-[10px] space-y-3 backdrop-blur-md rounded-3xl">
                <div className="font-black text-slate-500 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                    <Info size={12} /> Analysis Key
                </div>
                <div className="flex items-center gap-3 text-slate-300 font-bold uppercase tracking-wider">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" /> High Threat Node
                </div>
                <div className="flex items-center gap-3 text-slate-300 font-bold uppercase tracking-wider">
                    <div className="w-3 h-3 rounded-full bg-orange-500" /> Suspect Entity
                </div>
                <div className="flex items-center gap-3 text-slate-300 font-bold uppercase tracking-wider">
                    <div className="w-3 h-3 rounded-full bg-blue-500" /> Standard Account
                </div>
                <div className="flex items-center gap-3 text-slate-300 font-bold uppercase tracking-wider">
                    <div className="w-3 h-3 rounded-sm border-2 border-blue-500 bg-slate-900" /> Transaction Hub
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default GraphView;
