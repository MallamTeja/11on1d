import React, { useState, useEffect } from 'react';
import { Search, Plus, Loader2, Coins, Network } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent } from './ui/card';

interface Token {
  id: string;
  name: string;
  symbol: string;
  icon: string; // URL or Lucide icon name
  balance: number;
  network: string;
  contractAddress?: string;
}

interface Network {
  id: string;
  name: string;
  chainId: number;
}

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken?: Token;
  onSelect: (token: Token) => void;
  loading?: boolean;
  networks: Network[];
  selectedNetwork?: Network;
  onNetworkChange: (network: Network) => void;
}

export default function TokenSelector({
  tokens,
  selectedToken,
  onSelect,
  loading = false,
  networks,
  selectedNetwork,
  onNetworkChange,
}: TokenSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newToken, setNewToken] = useState({
    name: '',
    symbol: '',
    icon: '',
    contractAddress: '',
  });

  useEffect(() => {
    let filtered = tokens.filter(token =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedNetwork) {
      filtered = filtered.filter(token => token.network === selectedNetwork.name);
    }

    setFilteredTokens(filtered);
  }, [tokens, searchTerm, selectedNetwork]);

  const handleAddToken = () => {
    if (newToken.name && newToken.symbol && selectedNetwork) {
      const token: Token = {
        id: Date.now().toString(),
        ...newToken,
        balance: 0,
        network: selectedNetwork.name,
      };
      // In real app, add to tokens list
      setNewToken({ name: '', symbol: '', icon: '', contractAddress: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardContent className="p-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Network Selector */}
          <div className="mb-4">
            <Select
              value={selectedNetwork?.id}
              onValueChange={(value) => {
                const network = networks.find(n => n.id === value);
                if (network) onNetworkChange(network);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                {networks.map((network) => (
                  <SelectItem key={network.id} value={network.id}>
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4" />
                      {network.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Token List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))
            ) : filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <div
                  key={token.id}
                  onClick={() => onSelect(token)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedToken?.id === token.id
                      ? 'bg-primary/10 border border-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {token.icon.startsWith('http') ? (
                      <img src={token.icon} alt={token.name} className="w-full h-full object-cover" />
                    ) : (
                      <Coins className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{token.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{token.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{token.balance.toFixed(4)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Coins className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No tokens found</p>
              </div>
            )}
          </div>

          {/* Add Custom Token */}
          <div className="mt-4">
            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Token
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Custom Token</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Token Name</Label>
                    <Input
                      id="name"
                      value={newToken.name}
                      onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                      placeholder="e.g., My Token"
                    />
                  </div>
                  <div>
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input
                      id="symbol"
                      value={newToken.symbol}
                      onChange={(e) => setNewToken({ ...newToken, symbol: e.target.value })}
                      placeholder="e.g., MTK"
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon URL</Label>
                    <Input
                      id="icon"
                      value={newToken.icon}
                      onChange={(e) => setNewToken({ ...newToken, icon: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="contract">Contract Address</Label>
                    <Input
                      id="contract"
                      value={newToken.contractAddress}
                      onChange={(e) => setNewToken({ ...newToken, contractAddress: e.target.value })}
                      placeholder="0x..."
                    />
                  </div>
                  <Button onClick={handleAddToken} className="w-full">
                    Add Token
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
