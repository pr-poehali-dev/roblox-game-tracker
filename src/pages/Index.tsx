import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Player {
  id: string;
  username: string;
  status: 'online' | 'offline' | 'in-game';
  lastSeen: string;
  currentGame?: string;
  playtime: string;
  accountAge: string;
}

interface Game {
  id: string;
  name: string;
  players: number;
  lastUpdated: string;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const mockPlayers: Player[] = [
    {
      id: '1',
      username: 'Player_X247',
      status: 'online',
      lastSeen: '2 minutes ago',
      currentGame: 'Brookhaven RP',
      playtime: '4h 23m',
      accountAge: '2y 4m',
    },
    {
      id: '2',
      username: 'Shadow_Runner',
      status: 'in-game',
      lastSeen: 'Now',
      currentGame: 'Adopt Me!',
      playtime: '1h 15m',
      accountAge: '3y 8m',
    },
    {
      id: '3',
      username: 'NoobMaster2024',
      status: 'offline',
      lastSeen: '15 minutes ago',
      playtime: '0h 0m',
      accountAge: '1y 2m',
    },
  ];

  const mockGames: Game[] = [
    { id: '1', name: 'Brookhaven RP', players: 2, lastUpdated: '2 min ago' },
    { id: '2', name: 'Adopt Me!', players: 1, lastUpdated: '1 min ago' },
    { id: '3', name: 'Tower of Hell', players: 0, lastUpdated: '8 min ago' },
  ];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'Observer_01',
      message: 'Player_X247 just joined Brookhaven...',
      timestamp: '2m ago',
    },
    {
      id: '2',
      user: 'Watcher_99',
      message: 'This is insane, Shadow_Runner has been playing for hours',
      timestamp: '5m ago',
    },
    {
      id: '3',
      user: 'Anonymous',
      message: 'Anyone tracking NoobMaster2024?',
      timestamp: '8m ago',
    },
  ]);

  const filteredPlayers = mockPlayers.filter((player) =>
    player.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGames = mockGames.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportData = () => {
    const data = {
      players: mockPlayers,
      games: mockGames,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roblox-tracker-${Date.now()}.json`;
    a.click();
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: String(chatMessages.length + 1),
        user: 'You',
        message: chatMessage,
        timestamp: 'Just now',
      };
      setChatMessages([newMessage, ...chatMessages]);
      setChatMessage('');
    }
  };

  const getStatusColor = (status: Player['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'in-game':
        return 'bg-primary';
      case 'offline':
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Player['status']) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'in-game':
        return 'In-Game';
      case 'offline':
        return 'Offline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">ROBLOX TRACKER</h1>
            </div>
            <Button onClick={exportData} variant="outline" className="gap-2">
              <Icon name="Download" size={18} />
              Export Data
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="home" className="gap-2">
              <Icon name="Home" size={16} />
              Home
            </TabsTrigger>
            <TabsTrigger value="players" className="gap-2">
              <Icon name="Users" size={16} />
              Players
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2">
              <Icon name="Search" size={16} />
              Search
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <Icon name="MessageCircle" size={16} />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <Alert className="border-primary/50 bg-primary/10 glitch">
              <Icon name="AlertTriangle" className="h-5 w-5 text-primary" />
              <AlertDescription className="text-base font-semibold text-foreground ml-2">
                WARNING: This tracker is frequently taken down. Access while you can.
              </AlertDescription>
            </Alert>

            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-3xl">What is ROBLOX TRACKER?</CardTitle>
                <CardDescription className="text-base">
                  A real-time monitoring system for Roblox players and games
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  This platform tracks player activity, game sessions, and user behavior across the
                  Roblox platform. Monitor online status, playtime, and game preferences in
                  real-time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Users" size={24} className="text-primary" />
                      <h3 className="font-bold text-lg">Player Tracking</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Monitor player status and activity in real-time
                    </p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Gamepad2" size={24} className="text-primary" />
                      <h3 className="font-bold text-lg">Game Sessions</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Track which games are being played and for how long
                    </p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Download" size={24} className="text-primary" />
                      <h3 className="font-bold text-lg">Data Export</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Export tracking data and generate reports
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" size={20} />
                    Live Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="text-sm font-medium">Players Online</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500">
                        {mockPlayers.filter((p) => p.status !== 'offline').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="text-sm font-medium">Active Games</span>
                      <Badge variant="outline" className="bg-primary/20 text-primary border-primary">
                        {mockGames.filter((g) => g.players > 0).length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="text-sm font-medium">Total Tracked</span>
                      <Badge variant="outline">{mockPlayers.length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Popular Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockGames
                      .sort((a, b) => b.players - a.players)
                      .map((game) => (
                        <div
                          key={game.id}
                          className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Icon name="Gamepad2" size={18} className="text-primary" />
                            <span className="text-sm font-medium">{game.name}</span>
                          </div>
                          <Badge variant="outline">{game.players} players</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPlayers.map((player) => (
                <Card key={player.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon name="User" size={18} />
                        {player.username}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(player.status)}/20 border-${getStatusColor(
                          player.status
                        )}`}
                      >
                        {getStatusText(player.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Seen:</span>
                        <span className="font-medium">{player.lastSeen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Playtime:</span>
                        <span className="font-medium">{player.playtime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Age:</span>
                        <span className="font-medium">{player.accountAge}</span>
                      </div>
                      {player.currentGame && (
                        <div className="pt-2 border-t border-border">
                          <div className="flex items-center gap-2 text-primary">
                            <Icon name="Gamepad2" size={14} />
                            <span className="font-semibold">{player.currentGame}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Search" size={20} />
                  Search Players & Games
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Icon
                    name="Search"
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Enter username or game name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {searchQuery && (
              <>
                {filteredPlayers.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Players ({filteredPlayers.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {filteredPlayers.map((player) => (
                          <div
                            key={player.id}
                            className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(player.status)}`} />
                              <span className="font-medium">{player.username}</span>
                            </div>
                            <Badge variant="outline">{getStatusText(player.status)}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {filteredGames.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Games ({filteredGames.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {filteredGames.map((game) => (
                          <div
                            key={game.id}
                            className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Icon name="Gamepad2" size={18} className="text-primary" />
                              <span className="font-medium">{game.name}</span>
                            </div>
                            <Badge variant="outline">{game.players} active</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {filteredPlayers.length === 0 && filteredGames.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {!searchQuery && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Start typing to search...</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  Observer Chat
                </CardTitle>
                <CardDescription>Discuss what you're watching in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[400px] rounded-lg border border-border bg-secondary/30 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-primary">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm bg-secondary rounded-lg p-3">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} className="gap-2">
                    <Icon name="Send" size={18} />
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
